/**
 *  * Author: Denzel Ohene Sakyi
 * Contact: Denzel_ohenesakyi@student.uml.edu
 * Initializes the jQuery UI slider for the minimum multiplicand.
 * Source: Wellman, D. "The Slider Widget," jQuery UI, Chapter 6.
 */
$(document).ready(function() {
    // Define custom validation method
    $.validator.addMethod("greaterThan", function(value, element, param) {
        return this.optional(element) || parseInt(value) > parseInt($(param).val());
    }, "Please enter a value greater than the other value.");

    // Initialize form validation
    $("#multiplication-form").validate({
        rules: {
            minMultiplicand: {
                required: true,
                number: true,
                min: 1,
                max: 100
            },
            maxMultiplicand: {
                required: true,
                number: true,
                min: 1,
                max: 100,
                greaterThan: "#min-multiplicand"
            },
            minMultiplier: {
                required: true,
                number: true,
                min: 1,
                max: 100
            },
            maxMultiplier: {
                required: true,
                number: true,
                min: 1,
                max: 100,
                greaterThan: "#min-multiplier"
            }
        },
        messages: {
            minMultiplicand: {
                required: "Please enter a minimum multiplicand.",
                number: "Please enter a valid number.",
                min: "Please enter a number greater than or equal to 1.",
                max: "Please enter a number less than or equal to 100."
            },
            maxMultiplicand: {
                required: "Please enter a maximum multiplicand.",
                number: "Please enter a valid number.",
                greaterThan: "Maximum multiplicand must be greater than minimum multiplicand.",
                max: "Please enter a number less than or equal to 100."
            },
            minMultiplier: {
                required: "Please enter a minimum multiplier.",
                number: "Please enter a valid number.",
                min: "Please enter a number greater than or equal to 1.",
                max: "Please enter a number less than or equal to 100."
            },
            maxMultiplier: {
                required: "Please enter a maximum multiplier.",
                number: "Please enter a valid number.",
                greaterThan: "Maximum multiplier must be greater than minimum multiplier.",
                max: "Please enter a number less than or equal to 100."
            }
        },
        errorPlacement: function(error, element) {
            error.appendTo(element.parent());
        },
        submitHandler: function(form) {
            const minMultiplicand = parseInt($('#min-multiplicand').val());
            const maxMultiplicand = parseInt($('#max-multiplicand').val());
            const minMultiplier = parseInt($('#min-multiplier').val());
            const maxMultiplier = parseInt($('#max-multiplier').val());

            addTab(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier);
        }
    });

    // Initialize sliders
    $("#slider-min-multiplicand").slider({
        min: 1,
        max: 100,
        value: 1,
        slide: function(event, ui) {
            $("#min-multiplicand").val(ui.value).trigger("input");
        }
    });

    $("#slider-max-multiplicand").slider({
        min: 1,
        max: 100,
        value: 10,
        slide: function(event, ui) {
            $("#max-multiplicand").val(ui.value).trigger("input");
        }
    });

    $("#slider-min-multiplier").slider({
        min: 1,
        max: 100,
        value: 1,
        slide: function(event, ui) {
            $("#min-multiplier").val(ui.value).trigger("input");
        }
    });

    $("#slider-max-multiplier").slider({
        min: 1,
        max: 100,
        value: 10,
        slide: function(event, ui) {
            $("#max-multiplier").val(ui.value).trigger("input");
        }
    });

    // Two-way binding between sliders and inputs
    $("#min-multiplicand").on("input", function() {
        $("#slider-min-multiplicand").slider("value", $(this).val());
    });

    $("#max-multiplicand").on("input", function() {
        $("#slider-max-multiplicand").slider("value", $(this).val());
    });

    $("#min-multiplier").on("input", function() {
        $("#slider-min-multiplier").slider("value", $(this).val());
    });

    $("#max-multiplier").on("input", function() {
        $("#slider-max-multiplier").slider("value", $(this).val());
    });

    // Initialize tabs
    $("#tabs").tabs();

    // Function to add a new tab with generated table
    function addTab(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier) {
        var tabId = `tab-${minMultiplicand}-${maxMultiplicand}-${minMultiplier}-${maxMultiplier}`;
        var tabTitle = `${minMultiplicand}x${maxMultiplicand}-${minMultiplier}x${maxMultiplier}`;
        
        // Check if tab already exists
        if ($(`#${tabId}`).length === 0) {
            var newTab = `<li><a href="#${tabId}">${tabTitle}</a> <span class="ui-icon ui-icon-close" role="presentation">Remove Tab</span></li>`;
            $("#tabs ul").append(newTab);
            $("#tabs").append(`<div id="${tabId}"><table>${generateTable(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier)}</table></div>`);
            $("#tabs").tabs("refresh");

            // Add close event
            $("#tabs").on("click", "span.ui-icon-close", function() {
                var panelId = $(this).closest("li").remove().attr("aria-controls");
                $(`#${panelId}`).remove();
                $("#tabs").tabs("refresh");
            });
        }
    }

    function generateTable(minMultiplicand, maxMultiplicand, minMultiplier, maxMultiplier) {
        let table = '<tr><th></th>';
        for (let i = minMultiplier; i <= maxMultiplier; i++) {
            table += `<th>${i}</th>`;
        }
        table += '</tr>';
        for (let i = minMultiplicand; i <= maxMultiplicand; i++) {
            let row = `<tr><th>${i}</th>`;
            for (let x = minMultiplier; x <= maxMultiplier; x++) {
                row += `<td>${i * x}</td>`;
            }
            row += '</tr>';
            table += row;
        }
        return table;
    }
});
``
