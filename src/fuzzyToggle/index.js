function fuzzyToggle(){
}

fuzzyToggle.run = function(){
    let root = document.getElementById('root');
    if(root) root.textContent = 'Hello';
}

export default fuzzyToggle;