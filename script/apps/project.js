$(function(){

	//班级操作部分
	var btns = $('.classSquare');
	btns = $(btns);
	var removes = $('.classSquare .icon-remove');
	var i = 1;

	var addNew = $('.addNew');

	//点击.hasClassName按钮，跳转至已有科目入口
	var toCourse = function(){
		localStorage.nowProjectName = $(this).data('projectName');
		window.location = 'alreadyProject.html';
	};

	//初始化后对页面内容进行渲染
	if (localStorage.projectsName) {

		//classesName save all class's name
		var projects = localStorage.projectsName.split(',');
		console.log(projects);
	 	for (var index = 0; index < projects.length; index++) {
	 		$(btns[index]).addClass('hasClassName').data('projectName',projects[index]);
	 		$(btns[index]).children('span').text(projects[index]);
	 		$(btns[index]).on('click',toCourse);
	 		$(btns[index]).css('background-color','#fff');
	 	}
	}

	/**
	 * 点击带加号的按钮,打开添加名单的页面,并将加号后移一位
	 */
	// var addClasses = function(e){
	// 	if (i == btns.length) {
	// 		i=0;
	// 	}
	// 	plusBtn.removeClass('plusBtn animated shake infinite').addClass('hasClassName');
	// 	plusBtn.children('.icon-plus').hide();
	// 	plusBtn.off('click',toClassesControl);
	// 	plusBtn.off('click',addClasses);

	// 	$(btns[i++]).addClass('plusBtn');

	// 	plusBtn = $('.plusBtn');
	// 	plusBtn.children('.icon-plus').show();
	// 	plusBtn.on('click',toClassesControl);
	// 	plusBtn.on('click',addClasses);
	// 	e.stopPropagation();

	// 	addNew.trigger('click');
	// };
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
	// var toClassesControl = function(){
	// 	window.location = 'pages/classesControl.html';
	// };

	// 横滑跳转
	addNew.on('swipeReft',function(){
		window.location = "../index.html";
	});

	//点击班级进入班级入口
	// btns.on('click',function(){
	// 	window.location = "pages/classesControl.html";
	// });
	// plusBtn.on('click',toClassesControl);
	addNew.on('click',click_addNew);
	btns.on('longTap',showRemoves);
	removes.on('click',removeClasses);


});