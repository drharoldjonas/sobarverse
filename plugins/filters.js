import Vue from 'vue'
import dateFormat from 'dateformat'

Vue.filter('date_format', function (text, format) {
  if(text) {
    format = (format) ? format : 'yyyy/mm/dd';
    return dateFormat(text, format);
  } else {
    return '';
  }
});

Vue.filter('blog_list_date_format', function (text, format) {
  if (text) {
    format = (format) ? format : 'dd/mm/yyyy';
    return dateFormat(text, format);
  } else {
    return '';
  }
});

Vue.filter('latest_date_format', function (text, format) {
  if (text) {
    format = (format) ? format : 'dd.mm.yyyy';
    return dateFormat(text, format);
  } else {
    return '';
  }
});

Vue.filter('single_blog_date_format', function (text, format) {
  if (text) {
    format = (format) ? format : 'dd mmm.yyyy';
    return dateFormat(text, format);
  } else {
    return '';
  }
});

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

Vue.filter('format_date', function (text) {
  if(text) {
    var d = new Date(text);
    var date = months[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
    return date;
  } else {
    return '';
  }
});
