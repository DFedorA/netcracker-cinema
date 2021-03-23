import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Person, Product} from '../../shared/Interfaces';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductsService} from '../shared/services/products.service';
import {PersonsService} from '../shared/services/persons.service';

@Component({
  selector: 'app-edit-page-product',
  templateUrl: './edit-page-product.component.html',
  styleUrls: ['./edit-page-product.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class EditPageProductComponent implements OnInit {
  @ViewChild('select') selectRef: ElementRef;
  @ViewChild('director') directorRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('placeholder') placeholder: ElementRef;
  @ViewChildren('elements') elements: QueryList<any>;
  @ViewChildren('elementsOptions') elementsOptions: QueryList<any>;

  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  productPersons: Array<Person>;
  persons: Person[];
  product: Product;
  pSub: Subscription;
  pSub2: Subscription;
  selects = new Set();
  array;
  isOpen = false;
  uSub: Subscription;
  submitted = false;
  showButtonUpload = false;

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private personsService: PersonsService
  ) {
    this.productPersons = new Array<Person>();
  }

  ngOnInit(): void {
    this.pSub2 = this.personsService.fetch().subscribe(persons => {
      this.persons = persons;
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.productsService.getById(params.id);
      })
    ).subscribe((product: Product) => {
      this.product = product;

      if (this.product.person) {
        if (this.product.person.length === 1){
          this.product.person = JSON.parse(this.product.person);
        }
        for (const person of this.product.person){

          this.selects.add(person);
          this.pSub = this.personsService.getById(person).subscribe(currentPerson => {
            this.productPersons.push(currentPerson);
          });
        }
      }


      this.form = new FormGroup({
        name: new FormControl(product.name, Validators.required),
        type: new FormControl(product.type, Validators.required),
        year: new FormControl(this.dateFormat(product.year), Validators.required),
        nameOriginal: new FormControl(product.nameOriginal, Validators.required),
        genre: new FormControl(product.genre, Validators.required),
        country: new FormControl(product.country, Validators.required),
        rating: new FormControl(product.rating, Validators.required),
        description: new FormControl(product.description, Validators.required),
        trailerSrc: new FormControl(product.trailerSrc, Validators.required),
      });
      this.imagePreview = product.imageSrc;
    });
  }

  openMenu(): void {
    for (const elementOption of this.elementsOptions) {
      for (const element of this.selects) {
        if (element === elementOption.nativeElement.name) {
          elementOption.nativeElement.classList.add('multi-select__option--selected');
        }
      }
    }
    this.isOpen = !this.isOpen;
    if (this.isOpen === true) {
      this.menu.nativeElement.classList.add('multi-select__select--opened');
    } else {
      this.menu.nativeElement.classList.remove('multi-select__select--opened');
    }


  }

  check(person): void {
    this.setCheckedById(person._id, true);
    const span = document.createElement('span');
    const i = document.createElement('img');
    i.src = 'uploads/icon-times.svg';
    span.textContent = person.nameRu;
    span.classList.add('multi-select__selected-label');
    i.onclick = () => {
      span.parentNode.removeChild(span);
      this.selects.delete(person._id);
      this.setCheckedById(person._id, false);
      if (this.list.nativeElement.childNodes.length === 1) {
        this.placeholder.nativeElement.textContent = '-Выберите актёров-';
      }
    };
    this.list.nativeElement.appendChild(span);
    span.appendChild(i);
    this.selects.add(person._id);
    this.placeholder.nativeElement.textContent = '';
  }

  removeChecked(id): void {
    for (const element of this.elements) {
      if (id === element.nativeElement.id) {
        element.nativeElement.remove();
        this.selects.delete(element.nativeElement.id);
      }
      for (const elementOption of this.elementsOptions) {
        if (element.nativeElement.id === elementOption.nativeElement.name) {
          elementOption.nativeElement.classList.remove('multi-select__option--selected');
        }
      }
    }
    if (this.list.nativeElement.childNodes.length === 1) {
      this.placeholder.nativeElement.textContent = '-Выберите актёров-';
    }
  }

  setCheckedById(id: number, isChecked: boolean): void {
    for (const element of this.elementsOptions) {
      if (element.nativeElement.name === id) {
        if (isChecked) {
          element.nativeElement.classList.add('multi-select__option--selected');
        } else {
          element.nativeElement.classList.remove('multi-select__option--selected');
        }
      }
    }
  }

  dateFormat(str) {
    return new Date(str).toISOString().split('T')[0];
  }

  triggerClick(): void {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any): void {
    const file = event.target.files[0];
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };

    reader.readAsDataURL(file);
  }

  clearSelects():void{
    for (let value of this.selects) {
      this.removeChecked(value);
    }
    this.selects.clear();
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const fd = new FormData();

    fd.append('name', this.form.value.name);
    fd.append('nameOriginal', this.form.value.nameOriginal);
    fd.append('type', this.form.value.type);
    fd.append('year', this.form.value.year);
    fd.append('image', this.image);
    fd.append('rating', this.form.value.rating);
    fd.append('description', this.form.value.description);
    fd.append('genre', this.form.value.genre);
    fd.append('country', this.form.value.country);
    fd.append('trailerSrc', this.form.value.trailerSrc);
    fd.append('person', JSON.stringify(this.array = Array.from(this.selects)));
    fd.append('director', this.directorRef.nativeElement.value);
    this.submitted = true;
    this.uSub = this.productsService.update(this.product._id, fd).subscribe(() => {
      this.submitted = false;
      this.form.reset();
      this.imagePreview = '';
      this.clearSelects();
      this.router.navigate(['/admin', 'dashboard']);
    });
  }
}
