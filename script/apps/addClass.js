$(function(){

	//班级操作部分
	var btns = $('.classSquare');
	btns = $(btns);
	var removes = $('.classSquare .icon-remove');
	var i = 1;

	var addNew = $('.addNew');

	//初始化后对页面内容进行渲染
	if (localStorage.classesName) {

		//classesName save all class's name
		var classes = localStorage.classesName;
		console.log(classes);
	 	var plusbtn_loc = 0;
	 	for (var index = 0; index < classes.length; index++) {
	 		$(btns[index]).addClass('hasClassName');
	 		$(btns[index]).children('span').text(classes[index]);
	 		plusbtn_loc = index;
	 	}
	 	$(btns[plusbtn_loc+1]).addClass('plusBtn');
	}else{
		$(btns[0]).addClass('plusBtn');
	}

	var plusBtn = $('.plusBtn');
	$('.icon-plus').hide();
	$('.plusBtn .icon-plus').show();


	/**
	 * 点击带加号的按钮,打开添加名单的页面,并将加号后移一位
	 */
	var addClasses = function(e){
		if (i == btns.length) {
			i=0;
		}
		plusBtn.removeClass('plusBtn animated shake infinite').addClass('hasClassName');
		plusBtn.children('.icon-plus').hide();
		plusBtn.off('click',toClassesControl);
		plusBtn.off('click',addClasses);

		$(btns[i++]).addClass('plusBtn');

		plusBtn = $('.plusBtn');
		plusBtn.children('.icon-plus').show();
		plusBtn.on('click',toClassesControl);
		plusBtn.on('click',addClasses);
		e.stopPropagation();

		addNew.trigger('click');
	};
	var removeClasses = function(e){
		$(this).parent().text('');
		addNew.trigger('click');
	};

	var click_addNew = function(event){
		removes.hide();
		btns.removeClass('animated shake infinite');
	};
	var showRemoves = function(e){
		$(this).addClass('animated shake infinite');
		$(this).children('.icon-remove').show();
		e.stopPropagation();
	};

	//点击带加号的按钮跳转至添加班级入口
	var toClassesControl = function(){
		window.location = 'pages/classesControl.html';
	};

	//点击.hasClassName按钮，跳转至已有班级入口
	var toHasClassName = function(){
		window.location = '';
	};

	// 横滑跳转
	addNew.on('swipeLeft',function(){
		window.location = "pages/projects.html";
	});

	//点击班级进入班级入口
	// btns.on('click',function(){
	// 	window.location = "pages/classesControl.html";
	// });
	plusBtn.on('click',toClassesControl);
	addNew.on('click',click_addNew);
	btns.on('longTap',showRemoves);
	removes.on('click',removeClasses);


});