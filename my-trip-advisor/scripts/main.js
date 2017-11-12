var cityList = [
  '서울', '인천', '부산', '대전', '제주', '대구', '전주', '춘천', '여수', '경주', '울산', '통영'
];

$(function() {
  $('#calendar').datepicker();

  $('#city').autocomplete({
    source: cityList
  });

  $('form').on('submit', onSubmit);
});

function onSubmit(e) {
  e.preventDefault();
  e.stopPropagation();

  console.log('submit');
}

function validate(formData) {

}