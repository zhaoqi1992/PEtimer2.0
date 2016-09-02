$(function($) {

	//localStorage拿到传递过来的数据，进行首屏渲染
	// var classProject = localStorage.nowClassProject;
	var classProject = '2科目2';
	var editPanel = $('.classes-control-content');
	var data = localStorage.getItem(classProject);
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
	function Student(number, name, sex, score) {
		this.number = number;
		this.name = name;
		this.sex = sex;
		this.score = score;
	}

	var eachRecord = {
		init: function(students) {
			$('.classes-control-title-text').text(classProject);
			editPanel.hide();

			//初次渲染
			for (var i = 0; i < students.length; i++) {
				var str = '<tr><td>No.' + (i + 1) + "</td>";
				str += "<td>" + students[i].name + "</td>";
				str += "<td>" + students[i].score + "</td>";
				str += "<td><a class='class-control-table-item-delete h5'><i class='icon-trash'></i>删除</a></td></tr>";
				table.append(str);
			}
			$('.class-control-table-item-delete').hide();
			$('.classes-control-headcount').text(students.length);
		},

		save: function(data) {
			var className = $('#classesName').val();

			//保存新的数据
			if (className) {
				localStorage.setItem(className, JSON.stringify(data));
				hasModified = false;
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
				$('.class-control-table-item-delete').on('click', function() {
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



			//modal框的保存按钮，点击后保存
			$('#class-control-modal-save').on('click', function(e) {
				eachRecord.save(data);
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

			//点击首页按钮，进入计数界面
			$('.classes-control-functions-firstPage').on('click', function() {
				window.location = '../index.html';
			});
		}
	};

	eachRecord.init(students);
	eachRecord.bind();



});