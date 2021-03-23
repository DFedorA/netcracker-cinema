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
import {ProductsService} from '../shared/services/products.service';
import {Person} from '../../shared/Interfaces';
import {Subscription} from 'rxjs';
import {PersonsService} from '../shared/services/persons.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page-product',
  templateUrl: './create-page-product.component.html',
  styleUrls: ['./create-page-product.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePageProductComponent implements OnInit {
  @ViewChild('select') selectRef: ElementRef;
  @ViewChild('director') directorRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChild('placeholder') placeholder: ElementRef;
  @ViewChildren('elements') elements: QueryList<any>;
  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer = '';
  persons: Person[];
  pSub: Subscription;
  selects = new Set();
  selectsArray/* = Array.from(this.selects)*/;
  isOpen = false;
  showButtonUpload = false;

  constructor(public productsService: ProductsService,
              private router: Router,
              public personsService: PersonsService) {

  }

  ngOnInit(): void {
    this.pSub = this.personsService.fetch().subscribe(persons => {
      this.persons = persons;
    });

    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
      year: new FormControl(null, Validators.required),
      nameOriginal: new FormControl(null, Validators.required),
      genre: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      rating: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      trailerSrc: new FormControl(null, Validators.required)
    });
  }

  openMenu(): void {
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
      if (this.list.nativeElement.childNodes.length === 0) {
        this.placeholder.nativeElement.textContent = '-Выберите актёров-';
      }
    };
    this.list.nativeElement.appendChild(span);
    span.appendChild(i);
    this.selects.add(person._id);
    this.placeholder.nativeElement.textContent = '';
  }

  setCheckedById(id: number, isChecked: boolean): void {
    for (const element of this.elements) {
      if (element.nativeElement.id === id) {
        if (isChecked) {
          element.nativeElement.classList.add('multi-select__option--selected');
        } else {
          element.nativeElement.classList.remove('multi-select__option--selected');
        }
      }
    }
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

  submit(): void {
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
    fd.append('person', JSON.stringify(this.selectsArray = Array.from(this.selects)));
    fd.append('director', this.directorRef.nativeElement.value);

    this.productsService.create(fd).subscribe(() => {
      this.form.reset();
      this.imagePreview = '';
      this.router.navigate(['/admin', 'dashboard']);
    });

  }
}
