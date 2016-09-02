$(function() {
	//localStorage拿到传递过来的数据，进行首屏渲染
	var projectName = localStorage.nowProjectName;

	//获取当前项目下的班级-项目名
	var projects = [];
	if (localStorage.getItem(projectName)) {
		projects = localStorage.getItem(projectName).split(',');
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
		init: function(projects) {

			$('.classes-control-title-text').text(projectName);
			//初次渲染
			for (var i = 0; i < projects.length; i++) {
				var str = '<tr><td>' + (i + 1) + "</td>";
				str += "<td>" + projects[i] + "</td>";
				str += "<td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";
				table.append(str);
			}
			$('.class-control-table-item-delete').hide();
			$('.classes-control-headcount').text(projects.length);
		},

		save: function() {
			// 	var projectName =$('#course').val();

			// 	if(projectName){
			// 		var className = localStorage.nowClassName;

			// 		//保存新的数据

			// 		//保存科目字符串
			// 		projectsName.push(projectName);
			// 		localStorage.setItem('projectsName',projectsName);

			// 		//保存学生数据
			// 		var data = new Project(className+projectName,students_project);
			// 		localStorage.setItem(projectName+'-'+className,JSON.stringify(data));

			// 		//保存科目所含的班级
			// 		var projectsClass = [];
			// 		if(localStorage.getItem(projectName)){
			// 			projectsClass = localStorage.getItem(projectName).split(',');
			// 		}
			// 		projectsClass.push(className+projectName);
			// 		localStorage.setItem(projectName,projectsClass);

			hasModified = false;
			// 	}else{
			// 		$('#course').parent().addClass('has-error');
			// 	}
		},

		bind: function() {

			//点击添加班级按钮，跳转到添加班级页面
			$('.classes-control-functions-addClass').on('click', function() {
				window.location = 'classesControl.html';
			});

			//点击添加班级按钮，跳转到添加班级页面
			$('.classes-control-functions-alreadyClass').on('click', function() {
				window.location = '../index.html';
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
		}
	};
	count.init(projects);
	count.bind();

});