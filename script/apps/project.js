$(function(){

	//班级操作部分
	var plusBtn = $('.plusBtn');
	var btns = $('.classSquare');
	var removes = $('.classSquare i');
	var i = 1;

	var addNew = $('.addNew');



	var removeClasses = function(e){
		$(this).parent().text('');
		addNew.trigger('click');
	};

	var click_addNew = function(event){
		var icons = $('.classSquare i');
		icons.hide();
		btns.removeClass('animated shake infinite');
	};
	var showRemoves = function(e){
		$(this).addClass('animated shake infinite');
		$(this).children('i').show();
		e.stopPropagation();
	};

	addNew.on('click',click_addNew);
	btns.on('longTap',showRemoves);
	removes.on('click',removeClasses);

});