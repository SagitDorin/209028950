

// tooltip function in favorites page
window.onload=function(){
    // selecting the elements for which we want to add a tooltip
    const target = document.getElementById("tooltip");
    const tooltip = document.getElementById("tooltip-text");

    // change display to 'block' on mouseover
    target.addEventListener('mouseover', () => {
      tooltip.style.display = 'block';
    }, false);

    // change display to 'none' on mouseleave
    target.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    }, false);

}


// change 'favorite icon' in search page
function changeIcon() {
        var image = document.getElementById('favorite');
        if (image.src.match("LoveIcon.png")) {
            image.src = "LoveIconFill.png";
        }
        else {
            image.src = "LoveIcon.png";
        }
 }


// slideshow in about page
(function() {

	function Slideshow( element ) {
		this.el = document.querySelector( element );
		this.init();
	}

	Slideshow.prototype = {
		init: function() {
			this.wrapper = this.el.querySelector( ".slider-wrapper" );
			this.slides = this.el.querySelectorAll( ".slide" );
			this.previous = this.el.querySelector( ".slider-previous" );
			this.next = this.el.querySelector( ".slider-next" );
			this.index = 0;
			this.total = this.slides.length;
			this.timer = null;
			this.action();
			this.stopStart();
		},

		_slideTo: function( slide ) {
			var currentSlide = this.slides[slide];
			currentSlide.style.opacity = 1;
			for( var i = 0; i < this.slides.length; i++ ) {
				var slide = this.slides[i];
				if( slide !== currentSlide ) {
					slide.style.opacity = 0;
				}
			}
		},

		action: function() {
			var self = this;
			self.timer = setInterval(function() {
				self.index++;
				if( self.index == self.slides.length ) {
					self.index = 0;
				}
				self._slideTo( self.index );
			}, 4000);
		},

		stopStart: function() {
			var self = this;
			self.el.addEventListener( "mouseover", function() {
				clearInterval( self.timer );
				self.timer = null;
			}, false);
			self.el.addEventListener( "mouseout", function() {
				self.action();
			}, false);
		}
	};

	document.addEventListener( "DOMContentLoaded", function() {
		var slider = new Slideshow( "#main-slider" );
	});
})();


function getDate(){
    var today = new Date();

document.getElementById("date").value = today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);


}

// validation function
function ValidLogIn() {
    if (document.LogIn.email.value == "") {
        alert("Please fill in your email");
        document.LogIn.email.focus();
        return false;
    }
    if (document.LogIn.password.value == "") {
        alert("Please fill in your password");
        document.LogIn.password.focus();
        return false;
    }
}

// validation functions
function ValidForm() {
    if (document.NewAccount.email.value == "") {
        alert("Please fill in your email");
        document.NewAccount.email.focus();
        return false;
    }
    if (document.NewAccount.fname.value == "") {
        alert("Please fill in your first name");
        document.NewAccount.fname.focus();
        return false;
    }
    if (document.NewAccount.lname.value == "") {
        alert("Please fill in your last name");
        document.NewAccount.lname.focus();
        return false;
    }
    if (document.NewAccount.password.value == "") {
        alert("Please fill in password");
        document.NewAccount.password.focus();
        return false;
    }
    if (document.NewAccount.age.value == "") {
        alert("Please fill in your age");
        document.NewAccount.age.focus();
        return false;
    }
    if (document.NewAccount.phone.value == "") {
        alert("Please fill in your phone number");
        document.NewAccount.phone.focus();
        return false;
    }

/*
    if (!(/^\d+$/.test(document.NewAccount.phone.value))) {
        alert("Please fill in valid phone number");
        return false;
    } else {
        if (document.NewAccount.phone.value.length != 10) {
            alert("Please fill in valid phone number. ");
            return false;
        }
    }
*/
    if (!(/^\d+$/.test(document.NewAccount.age.value))) {
        alert("Age should only contain digits");
        return false;
    }

    var letters = /^[A-Za-z]+$/;
    if (!document.NewAccount.fname.value.match(letters)) {
        alert("Please fill in valid first name ");
        document.NewAccount.fname.focus();
        return false;
    } else if (!document.NewAccount.lname.value.match(letters)) {
        alert("Please fill in valid last name ");
        document.NewAccount.lname.focus();
        return false;
    }

}
 



class User{
    constructor(email,firstName, lastName) {
        this.email = email
        this.firstName= firstName
        this.lastName= lastName
    }
    
    getEmail(){
        return this.email
    }
}

const user1 =new User('sagit@gmail.com','Sagit',  'Dorin')

console.log(user1.getEmail())