import {createSearchMarker} from './map.js'

const minPriceOfType = {
  palace: '10000',
  flat: '1000',
  house: '5000',
  bungalow: '0',
};

const titleLength = {
  min: 30,
  max: 100,
};

const form = document.querySelector('.ad-form')
const selectType = form.querySelector('#type');
const inputPrice = form.querySelector('#price')
const selectCheckIn = form.querySelector('#timein');
const selectCheckOut = form.querySelector('#timeout');
const inputAdress = form.querySelector('#address')
const inputTitle = form.querySelector('#title')

const adressMarker = createSearchMarker();

const onMarkerSetProperties = () => {
  const  adress = adressMarker.getLatLng();
  inputAdress.value = `${adress.lat.toFixed(5)} ${adress.lng.toFixed(5)}`;
};


const onSelectChange = (evt) => {
  selectCheckIn.value = evt.target.value;
  selectCheckOut.value = evt.target.value;
}

const setPropertiesOfPrice = () => {
  inputPrice.placeholder = minPriceOfType[selectType.value];
  inputPrice.min =  minPriceOfType[selectType.value];
};

inputAdress.addEventListener('focus', (evt) => evt.target.disabled = true);
onMarkerSetProperties();
adressMarker.on('move', onMarkerSetProperties);

selectCheckIn.addEventListener('change', onSelectChange);
selectCheckOut.addEventListener('change', onSelectChange);

setPropertiesOfPrice();
selectType.addEventListener('change', () => setPropertiesOfPrice());

//form-validation

inputTitle.addEventListener('change', (evt) => {
  const evtTitleLength = evt.target.value.length ;

  if (evtTitleLength < titleLength.min) {
    evt.target.setCustomValidity(`Введите еще  ${titleLength.min - evtTitleLength} сим.`)

  } else if (evtTitleLength > titleLength.max) {
    evt.target.setCustomValidity(`Слишком длинное название удалите:  ${evtTitleLength - titleLength.max} сим.`);
  } else {
    evt.target.setCustomValidity('')
  }
  evt.target.reportValidity();
})
