$(function () {
    //Initialize Select2 Elements
    $('.select2').select2()

    //data-mask
    $('[data-mask]').inputmask()

    //Date picker
    $('.datepicker').datepicker({
      format: 'dd/mm/yyyy',
      todayBtn: true,
      language: 'th',             //เปลี่ยน label ต่างของ ปฏิทิน ให้เป็น ภาษาไทย   (ต้องใช้ไฟล์ bootstrap-datepicker.th.min.js นี้ด้วย)
      thaiyear: true              //Set เป็นปี พ.ศ.
  }).datepicker("setDate", "0");  //กำหนดเป็นวันปัจุบัน

    
  })
