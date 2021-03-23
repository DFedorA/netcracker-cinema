import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, Renderer2, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PersonsService} from '../shared/services/persons.service';
import {ProductsService} from '../shared/services/products.service';
import {Product} from '../../shared/Interfaces';
import {Subscription} from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-page-person',
  templateUrl: './create-page-person.component.html',
  styleUrls: ['./create-page-person.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePagePersonComponent implements OnInit {
  @ViewChild('select') selectRef: ElementRef;
  @ViewChild('input') inputRef: ElementRef;
  @ViewChild('menu') menu: ElementRef;
  @ViewChild('placeholder') placeholder: ElementRef;
  @ViewChild('list') list: ElementRef;
  @ViewChildren('elements') elements: QueryList<any>;
  form: FormGroup;
  image: File;
  showButtonUpload = false;
  imagePreview: string | ArrayBuffer = '';
  products: Product[];
  selects = new Set();
  selectsArray;
  pSub: Subscription;
  isOpen=false;

  constructor(public personsService: PersonsService,
              private router: Router,
              public productsService: ProductsService, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.pSub = this.productsService.fetch().subscribe(products => {
      this.products = products;
    });

    this.form = new FormGroup({
      name_ru: new FormControl(null, Validators.required),
      name_en: new FormControl(null, Validators.required),
      specialty: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
      poster: new FormControl(null)
    });
  }

  openMenu() {
    this.isOpen = !this.isOpen;
    if (this.isOpen === true) {
      this.menu.nativeElement.classList.add('multi-select__select--opened');
    } else {
      this.menu.nativeElement.classList.remove('multi-select__select--opened');
    }
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
      if (this.list.nativeElement.childNodes.length === 0) {
        this.placeholder.nativeElement.textContent = '-Выберите кинопроизведения-';
      }
    };
    this.list.nativeElement.appendChild(span);
    span.appendChild(i);
    this.selects.add(product._id);
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

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
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
    fd.append('nameRu', this.form.value.name_ru);
    fd.append('nameOriginal', this.form.value.name_en);
    fd.append('specialty', this.form.value.specialty);
    fd.append('dob', this.form.value.dob);
    fd.append('image', this.image);
    fd.append('products', JSON.stringify(this.selectsArray = Array.from(this.selects)));
    this.personsService.create(fd).subscribe(() => {
      this.form.reset();
      this.imagePreview = '';
      this.placeholder.nativeElement.textContent = '-Выберите кинопроизведения-';
      this.router.navigate(['/admin', 'dashboard']);
    });

  }
}

