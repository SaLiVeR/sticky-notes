/**
* Sticky Notes pastebin
* @ver 0.2
* @license BSD License - www.opensource.org/licenses/bsd-license.php
*
* Copyright (c) 2011 Sayak Banerjee <sayakb@kde.org>
* All rights reserved. Do not remove this copyright notice.
*/

var IsIe = (navigator.appName.indexOf("Microsoft") >= 0) ? true : false;
var privateChecked = false, captured = false;

// Startup function
$(document).ready(function() {
    var skinPath = $('#skin_path').html();

    // Disable auto complete
    $('#paste_form').attr('autocomplete', 'off');

    // Yea, we have JS \o/
    $('#js_switch').attr('href', '');

    // Show hand for button
    $('.button').mouseover(function() {
        this.style.cursor = 'pointer';
    });

    // Remove dotted lines around links
    $('a').click(function() {
        this.blur();
    });

    // Remove dotted line for drop menus
    $('select').change(function() {
        this.blur();
    });

    // Check if private box is checked
    if ($('#paste_private').is(':checked'))
    {
        privateChecked = true;
    }
    else
    {
        privateChecked = false;
    }

    $('#paste_private').click(function() {
        if ($(this).is(':checked'))
        {
            privateChecked = true;
        }
        else
        {
            privateChecked = false;
        }
    });

    // Update private checkbox if password is entered
    setInterval(function() {
        if ($('#paste_password').val() != '') {
            $('#paste_private').attr('checked', true);
            captured = true;
        }
        else if (captured && $('#paste_password').val() == '') {
            $('#paste_private').attr('checked', privateChecked);
            captured = false;
        }
    }, 100);
    
    // Fetch author and language values from cookies
    var author = $.cookie('stickynotes_author');
    var language = $.cookie('stickynotes_language');

    if (author != null) {
        $('#paste_user').val(author);
    }

    if (language != null) {
        $('#paste_lang').val(language);
    }
    
    // Insert tab in the code box
    $('#paste_data').keydown(function (e) {      
        if (e.keyCode == 9) {
            var myValue = "\t";
            var startPos = this.selectionStart;
            var endPos = this.selectionEnd;
            var scrollTop = this.scrollTop;
            this.value = this.value.substring(0, startPos) + myValue + this.value.substring(endPos,this.value.length);
            this.focus();
            this.selectionStart = startPos + myValue.length;
            this.selectionEnd = startPos + myValue.length;
            this.scrollTop = scrollTop;

            e.preventDefault();
        }
    });
});