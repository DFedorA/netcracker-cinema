import {Selector} from 'testcafe';

fixture`Getting Started`.page`http://localhost:4200/admin`;

const getFirstElement = Selector(className => {
  return document.getElementsByClassName(className)[0]
})
const getFirstElementId = Selector(idName => {
  return document.getElementById(idName)
})
const getElementNavbarLiCreatePerson = Selector(className => {
  return document.getElementsByClassName(className)[1]
})
const getElementForDel = Selector(className => {
  return document.getElementsByClassName(className)[15]
})
  test('Fedor test', async t => {
  await t
    .wait(1000)
    .typeText(Selector('#email'), 'eee@gmail.ru', {replace: true})
    .typeText(Selector('#password'), '123456', {replace: true})
    .wait(3000)
    .click(getFirstElement('btn'))
    .wait(3000)
    .click(getElementNavbarLiCreatePerson('navbar_li'))
    .wait(3000)
    .typeText(Selector('#name_ru'), 'test_ru', {replace: true})
    .wait(1000)
    .typeText(Selector('#name_en'), 'test_en', {replace: true})
    .wait(1000)
    .typeText(Selector('#specialty'), 'actor', {replace: true})
    .wait(1000)
    .typeText(Selector('#dob'), '2017-06-01', {replace: true})
    .wait(1000)
    .click(getFirstElementId('submit-button'))
    .wait(3000)
    .navigateTo('http://localhost:4200/admin/dashboard')
    .wait(3000)
    .setNativeDialogHandler(() => true)
    .click(getElementForDel('del'))
    .wait(3000)
    .pressKey('enter')
    .wait(5000);
});

fixture`Getting Started`.page`http://localhost:4200/`;

const getElementNavbarLiFeedBackPage = Selector(className => {
  return document.getElementsByClassName(className)[3]
})

test('Denis test', async t => {
  await t
    .wait(500)
    .typeText(Selector('#search'), '1+1')
    .wait(3000)
    .click(Selector('#Intouchables'))
    .wait(3000)
    .click(Selector('#popup'))
    .wait(500)
    .typeText(Selector('#sender'), 'test_name')
    .typeText(Selector('#message'), '1234567890')
    .click(Selector('#submit'))
    .navigateTo('http://localhost:4200/admin/feedback')
    .wait(1000)
    .typeText(Selector('#email'), 'eee@gmail.ru', {replace: true})
    .wait(2000)
    .typeText(Selector('#password'), '123456', {replace: true})
    .wait(2000)
    .click(Selector('.btn'))
    .wait(2000)
    .click(getElementNavbarLiFeedBackPage('navbar_li'))
    .wait(3000)
    .setNativeDialogHandler(() => true)
    .click(Selector('#test_name'))
    .wait(2000)
    .pressKey('enter')
});


fixture`Adding film on administrator's page`.page`http://localhost:4200/admin`;

const getElementLiCreateFilm = Selector(className => {
  return document.getElementsByClassName(className)[2];
});
const getElementClass = Selector(className => {
  return document.getElementsByClassName(className)[0];
});
const getAddButton = Selector(className => {
  return document.getElementsByClassName(className)[1];
});
const getTableButton = Selector(idName => {
  return document.getElementById(idName);
});
  test('Arina test', async t => {
  await t
    .wait(800)
    .typeText(Selector('#email'), 'eee@gmail.ru', {replace: true})
    .typeText(Selector('#password'), '123456', {replace: true})
    .wait(1000)
    .click(getElementClass('btn'))
    .wait(2000)
    .click(getElementLiCreateFilm('navbar_li'))
    .wait(2000)
    .typeText(Selector('#name'), 'Тестовое имя', {replace: true})
    .wait(1000)
    .typeText(Selector('#nameOriginal'), 'Test Name', {replace: true})
    .wait(1000)
    .typeText(Selector('#type'), 'Фильм', {replace: true})
    .wait(1000)
    .typeText(Selector('#rating'), '9.9', {replace: true})
    .wait(1000)
    .typeText(Selector('#genre'), 'Комедия', {replace: true})
    .wait(1000)
    .typeText(Selector('#country'), 'Франция', {replace: true})
    .wait(1000)
    .typeText(Selector('#year'), '2014-04-16', {replace: true})
    .wait(1000)
    .typeText(Selector('#description'), 'Просто классный фильм', {replace: true})
    .wait(1000)
    .typeText(Selector('#trailerSrc'), 'https://youtu.be/Lp6BdI9lto8', {replace: true})
    .wait(1000)
    .click(getAddButton('btn_product'))
    .wait(2000)
    .navigateTo('http://localhost:4200/admin/dashboard')
    .wait(2000)
    .click(getTableButton('productTable'))
    .wait(2000)
    .pressKey('enter')
    .wait(5000);
});