
$(function($){

	var classes = [];
	var classesName = [];
	var history = {};
	var i = 0;

	if(localStorage.classesName){
		classesName = localStorage.classesName.split(',');
	}

	/**
	 * [班级信息的数据结构]
	 * @param {[String]} name  [班级名称]
	 * @param {[Array]} games [比赛项目]
	 * @param {[Array]} students [学生]
	 */
	function ClassInfo(name,students,games){
		this.name = name;
		this.students = students;
		this.games = games;
	}

	/**
	 * 学生信息的数据结构
	 * @param {Number} number 学号
	 * @param {String} name   命名
	 * @param {String} sex    性别
	 * @param {String} score  成绩
	 */
	function Student(number,name,sex,score){
		this.number = number;
		this.name = name;
		this.sex = sex;
		this.score = score;
	}

//添加名单部分
	var classesControl = {
		studentNumber: $('#studentNumber').val(),
		studentName: $('#studentName').val(),
		studentSex: $('#studentSex').val(),
		className:$('#classesName').val(),
		next:$('.addStudent-btns-next'),
		save:$('.addStudent-btns-save'),
		students:[],
		number:0,

		render: function(){
			classesControl.number++;
			var table = $('.classes-control-table table');

			//学号,姓名,性别不能为空
			if(classesControl.studentNumber&&classesControl.studentName&&classesControl.studentSex){

				//去除错误提示标记
				$('#studentNumber').parent().removeClass('has-error');
				$('#studentName').parent().removeClass('has-error');
				$('#studentSex').parent().removeClass('has-error');

				var str = '<tr><td>No.'+classesControl.number+"</td><td>"+
							classesControl.studentNumber+"</td><td>"+classesControl.studentName+"</td><td>"+
							classesControl.studentSex+"</td><td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";

				table.append(str);
				$('#studentNumber').val('');
				$('#studentName').val('');
				$('.class-control-table-item-delete').hide();
				$('.classes-control-table').show();
				$('.classes-control-table-title').text('当前人数: '+classesControl.number);
				var student = new Student(classesControl.studentNumber,classesControl.studentName,
					classesControl.studentSex);
				classesControl.students.push(student);
			}else{
				if (!classesControl.studentNumber) {
					$('#studentNumber').parent().addClass('has-error');
				}
				if(!classesControl.studentName){
					$('#studentName').parent().addClass('has-error');
				}
				if(!classesControl.studentSex){
					$('#studentSex').parent().addClass('has-error');
				}
			}
		},

		init: function(){
			classesControl.studentNumber = $('#studentNumber').val();
			classesControl.studentName = $('#studentName').val();
			classesControl.studentSex = $('#studentSex').val();
			classesControl.className = $('#classesName').val();
		},

		toNext: function(e){
			classesControl.init();
			classesControl.render();
			e.stopPropagation();
		},
		toSave:function(){
			classesControl.init();

			//当前班级不能为空
			if (classesControl.className) {
				var nowClasses = localStorage.classes;
				var repeat = false;
				if (!repeat) {
					var classInfo = new ClassInfo(classesControl.className,classesControl.students);
					classesName.push(classesControl.className);
					localStorage.setItem(classesControl.className,JSON.stringify(classInfo));
					localStorage.setItem('classesName',classesName);
				}else{
					$('#helpBlock').show();
				}
			}else{
				$('#classesName').parent().addClass('has-error');
			}
		},
	};

	$('.classes-control-table').hide();
	$('.addStudent-btns-next').on('click',classesControl.toNext);
	jQuery(function(){
		$('.addStudent-btns-save').on('click',function(e){
			$('#class-control-modal').modal({
				backdrop:false
			});
			e.stopPropagation();
		});
		$('.classes-control-title i').on('click',function(e){
			$('#class-control-modal').modal({
				backdrop:false
			});
			e.stopPropagation();
		});
	});

	$('#class-control-modal-save').on('click',function(e){
		$('#class-control-modal .modal-body p').text('保存成功');
		classesControl.toSave();
		$('#class-control-modal-close').trigger('click');
		e.stopPropagation();
	});
	$('#class-control-modal-close').on('click',function(){
		window.location = '../index.html';
	});

	//点击编辑按钮，删除记录
	$('.classes-control-edit').on('click',function(){
		$('.class-control-table-item-delete').show();

		//避免重复绑定
		$('.class-control-table-item-delete').off();
		$('.class-control-table-item-delete').on('click',function(){
			$(this).parent().parent().remove();
			$('.class-control-table-item-delete').hide();
		});
	});
});