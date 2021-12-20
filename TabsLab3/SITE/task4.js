$(document).ready(function(){
    $('.task4_text').mouseover(function(){
        $(this).css('font-style', 'italic');
        localStorage.italics = true;
    });
    
      
      if (localStorage.italics) {
        $('.task4_text').css('font-style', 'italic');
      }

      $('.delete').click(function() {
        $('.task4_text').css('font-style', 'normal');
        localStorage.clear();
        localStorage.li_counter=1;
      });
});