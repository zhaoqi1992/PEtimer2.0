$(function($) {

	//localStorage拿到传递过来的数据，进行首屏渲染
	var className = localStorage.nowClassName;
	var editPanel = $('.classes-control-content');
	var data = localStorage.getItem(className);
	data = JSON.parse(data);
	var students = data.students;
	var table = $('.classes-control-table');
	var editBtn = $('.classes-control-edit');
	var hasModified = false;
	var modalByBackspace = false;

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

	var alreadyClass = {
		init: function(students) {
			$('.classes-control-title-text').text(className);
			editPanel.hide();

			//初次渲染
			for (var i = 0; i < students.length; i++) {
				var str = '<tr><td>No.' + (i+1) + "</td>";
				str += "<td>" + students[i].number + "</td>";
				str += "<td>" + students[i].name + "</td>";
				str += "<td>" + students[i].sex + "</td>";
				str += "<td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";
				table.append(str);
			}
			$('.class-control-table-item-delete').hide();
			$('.classes-control-headcount').text(students.length);
		},

		render: function() {
			var studentNumber = $('#studentNumber').val();
			var studentName =$('#studentName').val();
			var studentSex = $('#studentSex').val();
			var len = students.length;

			//学号,姓名,性别不能为空
			if(studentNumber&&studentName&&studentSex){

				//去除错误提示标记
				$('#studentNumber').parent().removeClass('has-error');
				$('#studentName').parent().removeClass('has-error');
				$('#studentSex').parent().removeClass('has-error');

				var str = '<tr><td>No.' + (len+1) + "</td>";
				str += "<td>" + studentNumber + "</td>";
				str += "<td>" + studentName + "</td>";
				str += "<td>" + studentSex + "</td>";
				str += "<td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";

				table.append(str);
				$('#studentNumber').val('');
				$('#studentName').val('');

				var student = new Student(studentNumber,studentName,studentSex);
				students.push(student);
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

			$('.classes-control-headcount').text(students.length);
		},

		next: function(e){
			alreadyClass.render();
			e.stopPropagation();
		},

		save:function(data){
			console.log('ext here');
			var className =$('#classesName').val();

			if(className){

				//保存新的数据
				data.students = students;
				localStorage.setItem(className,JSON.stringify(data));
				hasModified = false;
			}else{
				$('#classesName').parent().addClass('has-error');
			}
		},

		bind: function() {

			//点击“编辑”按钮，显示控制面板,给表格中的删除按钮绑定事件
			editBtn.on('click', function() {
				hasModified = true;
				modalByBackspace = true;
				editPanel.show();
				$('.class-control-table-item-delete').show();
				$('#classesName').val(className);

				//避免重复绑定
				$('.class-control-table-item-delete').off();
				$('.class-control-table-item-delete').on('click',function(){
					$(this).parent().parent().remove();
				});
			});


			//点击返回连接
			//判断是否修改过数据，如果没有直接返回，如果修改过，弹出modal，进行确认
			$('.classes-control-title .icon-angle-left').on('click', function(e) {
				if (!hasModified) {
					window.location = '../index.html';
				} else {
					$('#class-control-modal-save').show();
					$('#class-control-modal').modal({
						backdrop: false
					});
					e.stopPropagation();
					console.log(hasModified);
				}
			});

			//下一个按钮添加事件
			$('.addStudent-btns-next').on('click',alreadyClass.next);

			//点击保存按钮，弹出modal，提示保存成功
			$('.addStudent-btns-save').on('click',function(e){
				alreadyClass.save(data);
				$('#class-control-modal-save').hide();
				$('#class-control-modal .modal-body p').text('保存成功');
				modalByBackspace = false;

				$('#class-control-modal').modal({
					backdrop:false
				});

				setTimeout(function(){
					$('#class-control-modal-close').trigger('click');
				},1500);

				e.stopPropagation();
			});

			//modal框的保存按钮，点击后保存
			$('#class-control-modal-save').on('click',function(e){
				alreadyClass.save(data);
				$('#class-control-modal-close').trigger('click');
				e.stopPropagation();

				if(modalByBackspace){
					window.location = '../index.html';
				}
			});
		}
	};

	alreadyClass.init(students);
	alreadyClass.bind();



});