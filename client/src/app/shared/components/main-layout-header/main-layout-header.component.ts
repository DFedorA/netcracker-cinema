import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {Product} from '../../Interfaces';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-main-layout-header',
  templateUrl: './main-layout-header.component.html',
  styleUrls: ['./main-layout-header.component.less']
})
export class MainLayoutHeaderComponent implements OnInit {
  @ViewChild('burger') burger: ElementRef;
  @ViewChild('ul') menu: ElementRef;
  @ViewChild('nav') nav: ElementRef;
  @ViewChildren('li') li: QueryList<ElementRef>;
  @ViewChild('search') input: ElementRef;
  @ViewChild('btn') lupa: ElementRef;
  @ViewChild('table') table: ElementRef;

  products$: Observable<Product[]>;
  searchLines = new Subject<string>();
  isOpenSearch: boolean;

  constructor(private  productService: ProductService, private router: Router) {
  }

  ngOnInit(): void {

    this.products$ = this.searchLines.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((lines: string) => this.productService.search(lines))
    );
  }

  openMenu(): void {
    this.nav.nativeElement.classList.toggle('nav-list');
    this.menu.nativeElement.classList.toggle('nav-active');
    this.burger.nativeElement.classList.toggle('toggle');
    this.li.forEach((link, index) => {
      if (link.nativeElement.style.animation) {
        link.nativeElement.style.animation = '';
      } else {
        link.nativeElement.style.animation = `  navLinksFade 0.7s ease forwards ${index / 4 + 0.2}s`;
      }
    });
  }

  showSearchInput(): void {
    this.input.nativeElement.value = '';
    this.isOpenSearch = !this.isOpenSearch;
    if (!this.isOpenSearch) {
      this.lupa.nativeElement.hidden = false;
      this.table.nativeElement.hidden = true;
    }
  }

  searchProducts(link: string): void {
    this.searchLines.next(link);
    if (link.trim()) {
      this.isOpenSearch = true;
      this.table.nativeElement.hidden = false;
    } else {
      this.isOpenSearch = false;
      this.table.nativeElement.hidden = true;
    }
  }

  OnChoose(product) {
    this.router.navigate(['/film', product._id]);
    this.showSearchInput();
  }
}
