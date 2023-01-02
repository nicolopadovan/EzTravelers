/* Italian initialisation for the jQuery UI date picker plugin. */
/* Written by Antonello Pasella (antonello.pasella@gmail.com). */
(function (factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
})(function (datepicker) {
	"use strict";

	datepicker.regional.it = {
		closeText: "Chiudi",
		prevText: "Prec",
		nextText: "Succ",
		currentText: "Oggi",
		monthNames: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno",
			"Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
		monthNamesShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu",
			"Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		dayNames: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
		dayNamesShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"],
		dayNamesMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa"],
		weekHeader: "Sm",
		dateFormat: "dd/mm/yy",
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: ""
	};
	datepicker.setDefaults(datepicker.regional.it);

	return datepicker.regional.it;
});

window.addEventListener('DOMContentLoaded', () => {
	$(function () {
		let numberOfMonths = [1, 2];
		let stepMonths = 2;
		if ($(window).width() <= 478) { // Mobile Portrait Breakpoint
			numberOfMonths = [1, 1];
			stepMonths = 1;
		}

		$('#datepicker').datepicker({
			defaultDate: 0,
			maxDate: "2y",
			minDate: "0",
			numberOfMonths: numberOfMonths,
			showOtherMonths: false,
			selectOtherMonths: false,
			stepMonths: stepMonths,
			changeYear: true,
			changeMonth: true,
			showButtonPanel: false,
			onSelect: function (selectedDate) {
				console.log(`OnSelect triggered: ${selectedDate}`);
				$("#datepicker2").datepicker("option", "minDate", selectedDate);
				$("#datepicker2").datepicker("setDate", selectedDate);
				setTimeout(function () {
					$("#datepicker2").datepicker('show');
				}, 16);
			}
		});

		$('#datepicker2').datepicker({
			defaultDate: 0,
			maxDate: "2y",
			minDate: "0",
			numberOfMonths: numberOfMonths,
			showOtherMonths: false,
			selectOtherMonths: false,
			stepMonths: stepMonths,
			changeYear: true,
			changeMonth: true,
			showButtonPanel: false,
		});
	});
});
