document.addEventListener('DOMContentLoaded', function() {
    var menuItems = document.querySelectorAll('.menu-item');
    
    // Add 'active' class to the first menu item
    menuItems[0].classList.add('active');
    
    menuItems.forEach(function(item) {
      item.addEventListener('click', function(event) {
        event.preventDefault();
        removeActiveClass();
        item.classList.add('active');
      });
    });
    
    function removeActiveClass() {
      menuItems.forEach(function(item) {
        item.classList.remove('active');
      });
    }
  });
  