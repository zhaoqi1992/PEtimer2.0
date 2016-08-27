$('document').ready(function() {
	var min = 0,
		sec = 0,
		msec = 0;
	var timerInterval;
	var clicknumber_pause = 0,
		clicknumber_count = 0;
	var text = '';
	var listNumber = 0;
	var studentList = [];
	$('#Ok').addClass('disabled');
	$('div#input_name').hide();
	$('#show').addClass('disabled');
	$('#divForResult').hide();
	$('#divForGrade').hide();
	$('#count').addClass('disabled');
	$('#history').hide();

	function Student(name, order, grade) {
		this.name = name;
		this.order = order;
		this.grade = grade;
	}

	function getHistory(e) {
		e.stopPropagation();
		$('.deleteButton').remove();
		$('#flashContent').hide();
		$('div#blank').css('padding-bottom', '0');
		$('#divForResult').hide();
		$('#history').show();
		$('div#input_name').hide();
		$('#mymodal.modal-body p').text('确认删除？');
		var history = localStorage.getItem('history');
		if (!history) {
			history = '';
		}
		$('#history').empty().show();
		$('#result').empty().show();
		var historyItem = history.split(',');
		for (var j = 1; j < historyItem.length; j++) {
			var newTitle = '<li class="list-group-item list-group-item-success historyItem btn text-info h3">' + historyItem[j] + '</li>';
			$('#history').append(newTitle);
		}
		$('li.historyItem').click(function(e) {
			$('.deleteButton').remove();
			e.stopPropagation();
			$('#divForResult').show();
			$('#history').hide();
			var tableName = $(this).text();
			var table = localStorage.getItem(tableName);
			table = JSON.parse(table);
			$('#result').append('<tr class="text-info h3"><td>' + tableName + '</td><td></td><td></td></tr>');
			for (var i = 0; i < table.length; i++) {
				var name = table[i].name;
				var order = table[i].order;
				var grade = table[i].grade;
				var item = "<tr class='text-info h4'><td>No." + order + '</td><td>' + grade + '</td><td>' + name + '</td></tr>';
				$('#result').append(item);
			}
			$('#divForResult').append('<button id="deleteButton" class="btn btn-warning btn-lg deleteButton">' + '删除' + '</button>');
			$('#deleteButton').click(function(event) {
				$('#mymodal').modal('toggle');
				$('#continueDelete').click(function(e) {
					e.stopPropagation();
					for (var i = 0; i < historyItem.length; i++) {
						if (historyItem[i] == tableName) {
							historyItem.splice(i, 1);
						}
					}
					var history = historyItem.join(',');
					localStorage.setItem('history', history);
					localStorage.removeItem(tableName);
					$('#mymodal.modal-body p').text('删除成功');
					$('#showHistory').trigger('click');
				});
			});
		});
	}

	function addZeroToTime() {
		if (msec < 10) {
			msec = '0' + msec;
		}
		if (sec < 10) {
			sec = '0' + sec;
		}
		if (min < 10) {
			min = '0' + min;
		}
		text = min + ':' + sec + ':' + msec;
		msec = parseInt(msec);
		sec = parseInt(sec);
		min = parseInt(min);
	}

	function timer() {
		if (msec == 99) {
			if (sec == 60) {
				min += 1;
				sec = 0;
			}
			sec += 1;
			msec = 0;
		}
		msec += 1;
		addZeroToTime();
		$('h1').text(text);

	}
	$('#reset').click(function(e) {
		e.stopPropagation();
		clearInterval(timerInterval);
		msec = 0;
		sec = 0;
		min = 0;
		clicknumber_count = 0;
		clicknumber_pause = 0;
		listNumber = 0;
		$('h1').text('00:00:00');
		$('#start span').replaceWith('<span class="glyphicon glyphicon-play"></span>');
		$('#result').empty();
		$('#grade').empty();
		$('#history').empty().hide();
		$('#start').removeClass('disabled');
		$('#toNext').removeClass('disabled');
		studentList = new Array();
		$('#Ok').addClass('disabled');
		$('div#input_name').hide();
		$('#show').addClass('disabled');
		$('#divForResult').hide();
		$('#divForGrade').hide();
		$('#count').addClass('disabled');
		$('#showHistory').removeClass('disabled');
		// window.location.reload();
		$('#blank').unbind('click', blankClick);
		$('div#blank').css('padding-bottom', '100%');
		$('#input_name input#addTittle').val('');
		$('#input_name input#addName').val('');
		$('.deleteButton').remove();
		$('#flashContent').show();
	});

	function blankClick() {
		$('#divForGrade').show();
		$('#count').trigger('click');
	}
	$('#start').click(function(e) {
		e.stopPropagation();
		$('#flashContent').hide();
		$('.deleteButton').remove();
		$('#result').empty();
		$('#showHistory').addClass('disabled');
		$('#divForResult').hide();
		$('#history').hide();
		$('div#blank').css('padding-bottom', '100%');
		if (clicknumber_pause % 2) {
			$('#count').addClass('disabled');
			$('#blank').unbind('click', blankClick);
			// $('#grade').empty();
			clearInterval(timerInterval);
			addZeroToTime();
			$('h1').text(text);

			$('#start span').replaceWith('<span class="glyphicon glyphicon-play"></span>');
		} else {
			$('#count').removeClass('disabled');
			$('#blank').click(blankClick);
			timerInterval = setInterval(timer, 10);
			$('#start span').replaceWith('<span class="glyphicon glyphicon-pause"></span>');
		}
		clicknumber_pause++;
	});
	$('#count').click(function(e) {
		e.stopPropagation();
		$('#show').removeClass('disabled');
		$('#divForGrade').show();
		clicknumber_count++;
		addZeroToTime();
		$('h1').text(text);
		// var grade_table = '<tr><td>' + clicknumber_count + '</td><td>' + text + '</td></tr>';
		var grade_div = '<tr class="text-info h4"><td class="order">No.' + clicknumber_count + '</td> <td class="time">' + text + '</td></tr>';
		// $('#result').append(grade_table);
		$('#grade').append(grade_div);
	});
	$('#show').click(function(e) {
		// $('#showHistory').addClass('disabled');
		$('#flashContent').hide();
		if ($('#grade td')) {
			e.stopPropagation();
			// addZeroToTime();
			// $('h1').text(text);
			// $('#showHistory').removeClass('disabled');
			$('div#input_name').show();
			$('#divForGrade').hide();
			$('#show').addClass('disabled');
			$('#count').addClass('disabled');
			$('#blank').unbind('click', blankClick);
			$('#start').addClass('disabled', 'disabled');
			clearInterval(timerInterval);
			var time = $('#grade tr .time');
			var order = $('#grade tr .order');
			var gradeForStudent = '<h1>' + time.eq(listNumber).text() + '</h1>';
			$('h1').replaceWith(gradeForStudent);
			// var item = "<tr><td>"+i+'</td><td>'+time.eq(i).text()+'</td><td>'+name+'</td></tr>';
			// $('#result').append(item);
			$('#toNext').click(function(e) {
				e.stopPropagation();
				$('#divForResult').show();
				/* Act on the event */
				if (listNumber < time.length) {
					var name = $('#input_name input#addName').val();
					if (name) {
						var item = "<tr class='text-info h4'><td>No." + (listNumber + 1) + '</td><td>' + time.eq(listNumber).text() + '</td><td>' + name + '</td></tr>';
						$('#result').append(item);
						var newStudent = new Student(name, listNumber + 1, time.eq(listNumber).text());
						studentList.push(newStudent);
						listNumber++;
						gradeForStudent = '<h1>' + time.eq(listNumber).text() + '</h1>';
						$('h1').replaceWith(gradeForStudent);
						$('#input_name input#addName').val('');
					}
				}
				if (listNumber == time.length) {
					$('#toNext').addClass('disabled', 'disabled');
					$('#Ok').removeClass('disabled');
					gradeForStudent = '<h1>' + time.eq(listNumber - 1).text() + '</h1>';
					$('h1').replaceWith(gradeForStudent);
					$('#allNameOK').trigger('click');
				}
			});
			$('#Ok').click(function(e) {
				e.stopPropagation();
				if ($('#input_name input#addTittle').val()) {
					var history = localStorage.getItem('history');
					if (!history) {
						history = '';
					}
					$('#input_name input#addName').val('');
					$('#Ok').addClass('disabled', 'disabled');
					var newTittle = $('#input_name input#addTittle').val();
					history += ',' + newTittle;
					localStorage.setItem('history', history);
					var storageStydentList = JSON.stringify(studentList);
					localStorage.setItem(newTittle, storageStydentList);
					// if (newTittle) {
					// 	$('#history').append('<li class="list-group-item">' + newTittle + '</li>');
					// }
					$('#input_name input#addTittle').val('');
					listNumber = 0;
					$('#reset').trigger('click');
					$('#showHistory').trigger('click');
				}
			});
		}
	});
	$('#showHistory').click(getHistory);
	$('#allNameOK').click(function(e) {
		e.stopPropagation();
		$('#mymodal_next').modal({
			backdrop: false
		});
	});
	$('#flashContent').click(function(e){
		e.stopPropagation();
		$('#start').trigger('click');
	});
});