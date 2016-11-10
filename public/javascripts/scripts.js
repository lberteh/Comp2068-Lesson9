$('.confirmation').on('click', function(){
    return confirm('Are you sure you want to delete this?');
});

// use jquery validator to ensure passwords are equal when registering
var validator = $('#registerForm').validate({
  rules: {
    confirm: { // using the word confirm because it is the id of my password confirm input box
      required: true,
      equalTo: '#password'
    }
  },
  messages: {
    confirm: {
      equalTo: 'Your passwords do not match'
    }
  }
});
