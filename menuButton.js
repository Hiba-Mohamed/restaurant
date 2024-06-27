const menuButton = document.querySelector('.menuBtn');
menuButton.addEventListener('click', function(){
const dropDownDiv = document.querySelector('#hamburgerMenu')
if( dropDownDiv.classList.contains('dropDownHidden')){
dropDownDiv.classList.remove('dropDownHidden')
dropDownDiv.classList.add('dropDown')
}
else{
if(dropDownDiv.classList.contains('dropDown')){
dropDownDiv.classList.remove('dropDown')
dropDownDiv.classList.add('dropDownHidden')}
}
}) 