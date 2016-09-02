$(function() {
	//localStorage拿到传递过来的数据，进行首屏渲染
	var className = localStorage.nowClassName;
	var editPanel = $('.classes-control-content');

	var data = localStorage.getItem(className);
	data = JSON.parse(data);
	var students = data.students;

	var students_project = [];

	var classProjects = [];
	if (localStorage.getItem(className + '-projects')) {
		classProjects = localStorage.getItem(className + '-projects').split(',');
	}

	var projectsName = [];
	if (localStorage.projectsName) {
		projectsName = localStorage.projectsName.split(',');
	}


	var table = $('.classes-control-table');
	var editBtn = $('.classes-control-edit');
	var index = 0;
	var hasModified = false;
	var modalByBackspace = false;

	/**
	 * 学生信息的数据结构
	 * @param {Number} number 学号
	 * @param {String} name   命名
	 * @param {String} sex    性别
	 * @param {String} score  成绩
	 */
	function Student(number, name, score) {
		this.number = number;
		this.name = name;
		this.score = score;
	}

	/**
	 * 科目信息
	 * @param {[string]} name     projectName+clasName
	 * @param {[array]} students 该项目下的学生信息
	 */
	function Project(name, students) {
		this.name = name;
		this.students = students;
	}

	var count = {
		init: function(students) {
			editPanel.hide();

			//初次渲染
			for (var i = 0; i < students.length; i++) {
				var str = '<tr><td>No.' + (i + 1) + "</td>";
				str += "<td>" + students[i].number + "</td>";
				str += "<td>" + students[i].name + "</td>";
				str += '<td class="class-control-score"><input type="text" class="class-control-input"></input></td>';
				str += "<td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";
				table.append(str);
			}
			$('.class-control-table-item-delete').hide();
			$('.class-control-input:gt(0)').hide();
			$('.class-control-input:first').focus();
			$('.classes-control-headcount').text(students.length);
		},

		save: function(students_project) {
			var projectName = $('#course').val();

			if (projectName) {
				var className = localStorage.nowClassName;

				//保存新的数据
				//保存科目字符串
				projectsName.push(projectName);
				localStorage.setItem('projectsName', projectsName);

				//将科目名称添加进对应的班级-科目数组
				classProjects.push(className + projectName);
				localStorage.setItem(className + '-projects', classProjects);

				//保存学生数据
				var data = new Project(className + projectName, students_project);
				localStorage.setItem(className + projectName, JSON.stringify(data));

				//保存科目所含的班级
				var projectsClass = [];
				if (localStorage.getItem(projectName)) {
					projectsClass = localStorage.getItem(projectName).split(',');
				}
				projectsClass.push(className + projectName);
				localStorage.setItem(projectName, projectsClass);

				hasModified = false;
			} else {
				$('#course').parent().addClass('has-error');
			}
		},

		bind: function() {

			//点击表格成绩栏，会显示输入框并获得焦点
			var inputs_td = $('.class-control-score');
			var inputs = $('.class-control-input');
			inputs_td.on('click', function() {
				$(this).children('input').show().focus();
			});

			//表格成绩栏输入后，成绩显示在对应td中，构造新的student，并保存在students_project
			inputs.on('blur', function() {
				var value = $(this).val();
				var number = $(this).closest('tr').find('td:eq(1)').text();
				var name = $(this).closest('tr').find('td:eq(2)').text();
				if (value) {
					$(this).attr('placeholder', value);
					$(this).replaceWith(value);
					hasModified = true;

					//构造student,并保存在students_project
					var newStudent = new Student(number, name, value);

					students_project.push(newStudent);
				}
				$(this).hide();
			});

			//点击返回连接
			//判断是否修改过数据，如果没有直接返回，如果修改过，弹出modal，进行确认
			$('.classes-control-title .icon-angle-left').on('click', function(e) {
				if (!hasModified) {
					// window.location = '../index.html';
					history.back();
				} else {
					$('#class-control-modal-save').show();
					$('#class-control-modal').modal({
						backdrop: false
					});
					e.stopPropagation();
				}
			});

			//点击“编辑”按钮，显示控制面板,给表格中的删除按钮绑定事件
			editBtn.on('click', function() {
				hasModified = true;
				modalByBackspace = true;
				editPanel.show();
				$('.class-control-table-item-delete').show();
				$('#course').val(className);

				//避免重复绑定
				$('.class-control-table-item-delete').off();
				$('.class-control-table-item-delete').on('click', function() {
					$(this).parent().parent().remove();
				});
			});

			//modal框的保存按钮，点击后保存
			$('#class-control-modal-save').on('click', function(e) {
				count.save(students_project);
				$('#class-control-modal-close').trigger('click');
				e.stopPropagation();

				if (modalByBackspace) {
					history.back();
				}
			});

			//点击计时按钮，进入计时界面
			$('.classes-control-functions-timer').on('click', function() {
				window.location = 'timer.html';
			});

			//点击计数按钮，进入计数界面
			$('.classes-control-functions-counter').on('click', function() {
				window.location = 'count.html';
			});

			//点击首页按钮，回到首页
			$('.classes-control-functions-firstPage').on('click', function() {
				window.location = '../index.html';
			});
		}
	};
	count.init(students);
	count.bind();

});