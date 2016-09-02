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
					$('#closeMymodal').trigger('click');
					$('#showHistory').trigger('click');
				});
			});
		});
	}