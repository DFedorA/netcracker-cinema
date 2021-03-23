import {ProductService} from './product.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {TestBed} from '@angular/core/testing';
import {HttpTestingController} from '@angular/common/http/testing';

describe('productService', () => {
  let service: ProductService;

  const product = {
      id: '602552065894ab481c7055df',
      type: 'Сериал',
      rating: 7.4,
      description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти - хоть от чудищ болотных, оборотней и даже заколдованных принцесс. В сельской глуши местную девушку Йеннифэр, которой сильно не повезло с внешностью, зато посчастливилось иметь способности к магии, отец продаёт колдунье в ученицы. А малолетняя наследница королевства Цинтра по имени Цири вынуждена пуститься в бега, когда их страну захватывает империя Нильфгаард. Судьбы этих троих окажутся тесно связаны, но скоро сказка сказывается, да не скоро дело делается.',
      trailerSrc: 'https://youtu.be/EUizTA1nrfA',
      imageSrc: 'uploads\\12022021-164939_387-witcher-poster.jpg',
      name: 'Ведьмак',
      year: '2021-02-11T00:00:0 0.000Z',
      nameOriginal: 'The Witcher',
      genre: 'Фантастика',
      person: ['["603f1b75e474f81898bf4905","603f21eb9208e56a341ba939"]'],
      country: 'США',
      director: '603f1b75e474f81898bf4905'
    };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, HttpClient , HttpHandler]
    });
    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(service).toBeDefined();
  });

  it('must get all the products', () => {
    expect(service.getAll()).toBeDefined();
  });

  it('must get by id products', () => {
    service.getById(product.id).subscribe((data) => {
      expect(product.id).toEqual(data.id);
    });
  });

  it('must get by name products', () => {
    expect(service.search(product.name)).toBeDefined();
  });
});

