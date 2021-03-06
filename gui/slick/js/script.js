function initHeader() {		
	//settings
	var header = $("#header");
	var fadeSpeed = 100, fadeTo = 0.8, topDistance = 20;
	var topbarME = function() { $(header).fadeTo(fadeSpeed,1); }, topbarML = function() { $(header).fadeTo(fadeSpeed,fadeTo); };
	var inside = false;
	//do
	$(window).scroll(function() {
		position = $(window).scrollTop();
		if(position > topDistance && !inside) {
			//add events
			topbarML();
			$(header).bind('mouseenter',topbarME);
			$(header).bind('mouseleave',topbarML);
			inside = true;
		}
		else if (position < topDistance){
			topbarME();
			$(header).unbind('mouseenter',topbarME);
			$(header).unbind('mouseleave',topbarML);
			inside = false;
		}
	});
	
}


function initActions() {
	$("#SubMenu a").button({ icons: { primary: "ui-icon-power" }  });
	$("#SubMenu a.confirm").button({ icons: { primary: "ui-icon-power" }  });
	$("#SubMenu a:contains('Edit')").button({ icons: { primary: "ui-icon-pencil" }  });
	$("#SubMenu a:contains('Delete')").button({ icons: { primary: "ui-icon-trash" }  });
	$("#SubMenu a:contains('Re-scan')").button({ icons: { primary: "ui-icon-refresh" }  });
	$("#SubMenu a:contains('Force')").button({ icons: { primary: "ui-icon-transfer-e-w" }  });
	$("#SubMenu a:contains('Rename')").button({ icons: { primary: "ui-icon-tag" }  });
	$("#SubMenu a:contains('Restart')").button({ icons: { primary: "ui-icon-tag" }  });
	$("#SubMenu a[href='/home/addShows/']").button({ icons: { primary: "ui-icon-video" }  });
	$("#SubMenu a[href='/home/postprocess/']").button({ icons: { primary: "ui-icon-folder-open" }  });
	$("#SubMenu a[href='/home/updatePLEX/']").button({ icons: { primary: "ui-icon-refresh" }  });
}

function showMsg(msg,loader,timeout,ms) {
	var feedback = $("#ajaxMsg");
	update = $("#updatebar");
	if ( update.is(":visible") ) {
		var height = update.height() + 35;
		feedback.css("bottom",height + "px");
	} else {
		feedback.removeAttr("style");
	}
	feedback.fadeIn();
	var message = $("<div class='msg'>" + msg + "</div>");
	if (loader) {
		var message = $("<div class='msg'><img src='interfaces/default/images/loader_black.gif' alt='loading' class='loader' style='position: relative;top:10px;margin-top:-15px; margin-left:-10px;'/>" + msg + "</div>");
		feedback.css("padding","14px 10px")
	}
	$(feedback).prepend(message);
	if (timeout) {
		setTimeout(function(){
			message.fadeOut(function(){
				$(this).remove();
				feedback.fadeOut();					
			});
		},ms);
	} 
}

function resetFilters(text){
	if ( $(".dataTables_filter").length > 0 ) {
		$(".dataTables_filter input").attr("placeholder","filter " + text + "");
	}
}

function preventDefault(){
	$("a[href='#']").live('click', function(){
		return false;
	});
}

function initFancybox() {
	if ( $("a[rel=dialog]").length > 0 ) {
		$.getScript('/js/fancybox/jquery.fancybox-1.3.4.js', function() {
			$("head").append("<link rel='stylesheet' href='/js/fancybox/jquery.fancybox-1.3.4.css'>");
	 		$("a[rel=dialog]").fancybox({
	 			type: "image"
	 		});
	 	});
	 }
}

function initTabs() {
  $("#config-components").tabs({
        show: function(event, ui) {

            var lastOpenedPanel = $(this).data("lastOpenedPanel");
            var selected = $(this).tabs('option', 'selected');

            if (lastOpenedPanel) {
            } else {
             lastOpenedPanel = $(this).tabs("option", "panel").find('.ui-tabs-panel').eq('0');
            }

            if (!$(this).data("topPositionTab")) {
                $(this).data("topPositionTab", $(ui.panel).position().top)
            }         

            //Dont use the builtin fx effects. This will fade in/out both tabs, we dont want that
            //Fadein the new tab yourself            
            $(ui.panel).hide().fadeIn(400);

            if (lastOpenedPanel) {

                // 1. Show the previous opened tab by removing the jQuery UI class
                // 2. Make the tab temporary position:absolute so the two tabs will overlap
                // 3. Set topposition so they will overlap if you go from tab 1 to tab 0
                // 4. Remove position:absolute after animation
                lastOpenedPanel
                    .toggleClass("ui-tabs-hide")
                    .css("position", "absolute")
                    .css("top", $(this).data("topPositionTab") + "px")
                    .fadeOut(400, function() {
                        $(this)
                        .css("position", "");
                    });

            }

            //Saving the last tab has been opened
            $(this).data("lastOpenedPanel", $(ui.panel));

        }

    });
}

function init() {
	initHeader();
	preventDefault();
	initFancybox();
	initTabs();
}

$(document).ready(function(){
	init();
});
