// This is a JavaScript file
// This is a JavaScript file

  function circle(){
        
        var circleBar    = document.getElementsByClassName('circle-bar')[0];
        var countTime = parseInt(localStorage.getItem("SportTime_Count"));
        var targetTime = parseInt(localStorage.getItem("TargetTime"));
        var percent =  Math.round((countTime/targetTime)*100);
        console.log(percent);
        var left_circle  = circleBar.getElementsByClassName('circle-bar-left')[0];
        var right_circle = circleBar.getElementsByClassName('circle-bar-right')[0];

        if( percent <= 50 ) {
            var rotate = 'rotate('+(percent*3.6)+'deg)';
            right_circle.css3('transform',rotate);
        } else {
            var rotate = 'rotate('+((percent-50)*3.6)+'deg)';
            right_circle.css3('transform','rotate(0deg)');
            left_circle.css3('transform',rotate);
        } 
    }

    Element.prototype.css = function(property,value){
        
        if ( value ) {
            var index = property.indexOf('-');
            if( index != -1 ) {
                var char = property.charAt(index+1).toUpperCase();
                property.replace(/(-*){1}/,char);
            }
            this.style[property] = value;
        }else{
            return window.getComputedStyle(this).getPropertyValue(property);
        }
    }

    Element.prototype.css3 = function(property,value){
        if( value ){
            property = capitalize(property.toLowerCase());
            this.style['webkit'+property] = value;
            this.style['Moz'+property] = value;
            this.style['ms'+property] = value;
            this.style['O'+property] = value;
            this.style[property.toLowerCase()] = value;
        }else{
            return window.getComputedStyle(this).getPropertyValue(
                    ('webkit'+property)||('Moz'+property)||('ms'+property)||('O'+property)||property);
        }
        
        function capitalize(word){
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    }
