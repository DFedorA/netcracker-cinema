import {Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PersonsService} from '../shared/services/persons.service';
import {ProductsService} from '../shared/services/products.service';
import {switchMap} from 'rxjs/operators';
import {Person, Product} from '../../shared/Interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-edit-page-person',
  templateUrl: './edit-page-person.component.html',
  styleUrls: ['./edit-page-person.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class EditPagePersonComponent implements OnInit, OnDestroy {
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('select') selectRef: ElementRef;
  @ViewChild('placeholder') placeholder: ElementRef;
  @ViewChildren('elements') elements: QueryList<any>;
  @ViewChildren('elementsOptions') elementsOptions: QueryList<any>;

  form: FormGroup;
  image: File;
  person: Person;
  products: Product[];
  personProducts: Array<Product>;
  uSub: Subscription;
  pSub: Subscription;
  selects = new Set();
  isOpen = false;
  array;
  submitted = false;
  imagePreview: string | ArrayBuffer = '';
  showButtonUpload = false;

  constructor (private route: ActivatedRoute,
               private router: Router,
               private productsService: ProductsService, private personsService: PersonsService) {
    this.personProducts = new Array<Product>();
  }

  ngOnInit() {
    this.pSub = this.productsService.fetch().subscribe(products => {
      this.products = products;
    });

    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.personsService.getById(params.id);
      })
    ).subscribe((person: Person) => {
      this.person = person;

      if (this.person.products) {
        if (this.person.products.length === 1){
          this.person.products = JSON.parse(this.person.products);
        }
        for (const product of this.person.products) {
          this.selects.add(product);
          this.pSub = this.productsService.getById(product).subscribe(currentProduct => {
            this.personProducts.push(currentProduct);
          });
        }
      }

      this.form = new FormGroup({
        name_ru: new FormControl(person.nameRu, Validators.required),
        name_en: new FormControl(person.nameOriginal, Validators.required),
        specialty: new FormControl(person.specialty, Validators.required),
        dob: new FormControl(this.dateFormat(person.dob), Validators.required)
      });
      this.imagePreview = person.imageSrc;
    });
  }

  check(product): void {
    this.setCheckedById(product._id, true);
    const span = document.createElement('span');
    const i = document.createElement('img');
    i.src = 'uploads/icon-times.svg';
    span.textContent = product.name;
    span.classList.add('multi-select__selected-label');
    i.onclick = () => {
      span.parentNode.removeChild(span);
      this.selects.delete(product._id);
      this.setCheckedById(product._id, false);
      if (this.list.nativeElement.childNodes.length === 1) {
        this.placeholder.nativeElement.textContent = '-Выберите кинопроизведения-';
      }
    };
    this.list.nativeElement.appendChild(span);
    span.appendChild(i);
    this.selects.add(product._id);
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
      this.placeholder.nativeElement.textContent = '-Выберите кинопроизведения-';
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

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  dateFormat(str) {
    return new Date(str).toISOString().split('T')[0];
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

  submit() {
    if (this.form.invalid) {
      return;
    }

    const fd = new FormData();
    fd.append('nameRu', this.form.value.name_ru);
    fd.append('nameOriginal', this.form.value.name_en);
    fd.append('specialty', this.form.value.specialty);
    fd.append('dob', this.form.value.dob);
    fd.append('image', this.image);
    fd.append('products', JSON.stringify(this.array = Array.from(this.selects)));
    this.submitted = true;
    this.uSub = this.personsService.update(this.person._id, fd).subscribe(() => {
      this.submitted = false;
      this.form.reset();
      this.imagePreview = '';
      this.clearSelects();
      this.router.navigate(['/admin', 'dashboard']);
    });
  }

  ngOnDestroy() {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
  }

}
