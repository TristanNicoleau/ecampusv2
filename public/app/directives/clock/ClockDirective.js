/*global Raphael*/
angular.module('location.directives').directive('clock', function ($window) {

    var clock = {
        // Fonction d'affichage des heures
        displayHours: function () {
            var degree, x, y, i, point;
            for (i = 1; i <= 24; i++) {
                degree = clock.timeToDegree(i, 0);
                point = clock.polarToCarthesian(clock.radius, degree);

                x = clock.center.x + point.x;
                y = clock.center.y - point.y;

                clock.r.text(x, y, i).attr({
                    font: clock.fontSize + ' Arial',
                    fill: '#000'
                }).toFront();
            }
        },

        // Conversion temps / degrés
        timeToDegree: function (hours, minutes) {
            return (450 - ((hours % 24) * 60 + minutes) / 4) % 360;
        },

        polarToCarthesian: function (radius, angle) {
            return {
                x: radius * Math.cos(angle * Math.PI / 180),
                y: radius * Math.sin(angle * Math.PI / 180)
            };
        },

        arc: function (timeStart, timeEnd, radius) {
            var startAngle, endAngle;
            startAngle = clock.timeToDegree(timeStart.getHours(), timeStart.getMinutes());
            endAngle = clock.timeToDegree(timeEnd.getHours(), timeEnd.getMinutes());

            var point = clock.polarToCarthesian(radius, startAngle);

            var sx = clock.center.x + point.x;
            var sy = clock.center.y - point.y;

            point = clock.polarToCarthesian(radius, endAngle);

            var x = clock.center.x + point.x;
            var y = clock.center.y - point.y;

            var path = [
                    ['M', sx, sy],
                    ['A', radius, radius, 0, +((startAngle - endAngle) > 180), 1, x, y]
                ];
            return {
                path: path
            };
        },

        animations: {
            mouseover: function () {
                console.log('MouseOver !!');
                this.animate({
                    'stroke-width': (clock.arcWidth * 1.05),
                    opacity: 0.80
                }, 400, 'bounce');
                if (Raphael.type !== 'VML') { //solves IE problem
                    this.toFront();
                }
            },
            mouseout: function () {
                console.log('MouseOut !!');
                this.stop().animate({
                    'stroke-width': clock.arcWidth * 0.85,
                    opacity: 1
                }, 400, 'elastic');
            }
        },

        debugArc: function (slot) {
            console.log('DEBUG');
            console.log(slot);
            $window.alert('id :' + slot.id + '\nslot : ' + JSON.stringify(slot));
        },

        diagram: function () {
            var j, lenj, item, timeslot, arc;

            clock.r.circle(clock.center.x, clock.center.y, clock.radius).attr({
                stroke: 'none',
                fill: '#fff'
            });

            clock.displayHours();

            console.log('Taille des slots :' + (clock.data.length + 1));
            for (var i = 0; i < clock.data.length; i++) {
                plug = clock.data[i];
                for (j = 0; j < plug.slots.length; j++) {
                    slot = plug.slots[j];
                    arc = clock.r.path().attr({
                        arc: [slot.timeStart, slot.timeEnd, clock.radius + (i + 0.8) * clock.arcWidth],
                        stroke: plug.color,
                        'stroke-width': (clock.arcWidth * 0.85) + 'px'
                    });

                    if (clock.animate) {
                        arc.mouseover(clock.animations.mouseover).mouseout(clock.animations.mouseout);
                    }

                    if (clock.debug) {
                        // arc.click(clock.debugArc(slot));
                    }

                }
            }
        }
    };

    return {
        restrict: 'E',
        template: '<div class="clock"></div>',
        scope: false,
        replace: true,
        link: function (scope, element, attrs) {
            // scope.$watch('plugListService.plugs', function (newValue) {
            //     if (newValue) {
            //         console.log('New Value');
            //         console.log(newValue);
            //         clock.data = newValue;
            //         clock.side = element[0].clientWidth;
            //         clock.fontSize = '9px';

            //         clock.r = new Raphael(element[0], clock.side, clock.side);
            //         clock.r.customAttributes.arc = clock.arc;
            //         clock.radius = clock.side / 6;
            //         clock.center = {
            //             x: clock.side / 2,
            //             y: clock.side / 2
            //         };
            //         clock.arcWidth = (clock.side / 2 - clock.radius) / (clock.data.length + 0.5);

            //         clock.debug = attrs.debug ? true : false;
            //         clock.animate = attrs.animate ? true : false;

            //         clock.diagram();
            //         clock.init(element, attrs);
            //     }
            // });
            //     clock.data = scope.clockplugs;
            clock.data = [{
                "id": "53d90b35e1c8c7e8223986d6",
                "status": "off",
                "active": false,
                "name": "Cuisine",
                "devices": [{
                    "type": "Dock téléphone",
                    "name": "HTC",
                    "power": 80,
                    "id": "53d90bb9e1c8c7e8223986d7"
                }],
                "slots": [{
                    "timeStart": new Date("2014-07-30T18:00:08.497Z"),
                    "timeEnd": new Date("2014-07-29T22:00:08.497Z"),
                    "id": "53d90bd4e1c8c7e8223986d8",
                    "weekdayEnd": {
                        "name": "Mardi",
                        "value": 1
                    },
                    "weekdayStart": {
                        "name": "Lundi",
                        "value": 0
                    }
                }, {
                    "timeStart": new Date("2014-07-30T13:00:07.309Z"),
                    "timeEnd": new Date("2014-07-30T21:00:07.309Z"),
                    "id": "53d911b6e1c8c7e8223986d9",
                    "weekdayEnd": {
                        "name": "Mardi",
                        "value": 1
                    },
                    "weekdayStart": {
                        "name": "Mardi",
                        "value": 1
                    }
                }],
                "plugNumber": [0, 1, 1, 0, 0, 1, 0, 1, 0],
                "owners": ["53d78fe8aa63ada42d888dc5"],
                "color": "#a46b90",
                "__v": 0
            }, {
                "id": "53d90b35e1c8c7e8223986d6",
                "status": "off",
                "active": false,
                "name": "Cuisine",
                "devices": [{
                    "type": "Dock téléphone",
                    "name": "HTC",
                    "power": 80,
                    "id": "53d90bb9e1c8c7e8223986d7"
                }],
                "slots": [{
                    "timeStart": new Date("2014-07-30T10:00:08.497Z"),
                    "timeEnd": new Date("2014-07-29T12:00:08.497Z"),
                    "id": "53d90bd4e1c8c7e8223986d8",
                    "weekdayEnd": {
                        "name": "Mardi",
                        "value": 1
                    },
                    "weekdayStart": {
                        "name": "Lundi",
                        "value": 0
                    }
                }, {
                    "timeStart": new Date("2014-07-30T14:00:07.309Z"),
                    "timeEnd": new Date("2014-07-30T19:00:07.309Z"),
                    "id": "53d911b6e1c8c7e8223986d9",
                    "weekdayEnd": {
                        "name": "Mardi",
                        "value": 1
                    },
                    "weekdayStart": {
                        "name": "Mardi",
                        "value": 1
                    }
                }],
                "plugNumber": [0, 1, 1, 0, 0, 1, 0, 1, 0],
                "owners": ["53d78fe8aa63ada42d888dc5"],
                "color": "#84c465",
                "__v": 0
            }];

            clock.side = element[0].clientWidth;
            clock.fontSize = '9px';

            clock.r = new Raphael(element[0], clock.side, clock.side);
            clock.r.customAttributes.arc = clock.arc;
            clock.radius = clock.side / 6;
            clock.center = {
                x: clock.side / 2,
                y: clock.side / 2
            };
            clock.arcWidth = (clock.side / 2 - clock.radius) / (clock.data.length + 0.5);

            clock.debug = attrs.debug ? true : false;
            clock.animate = attrs.animate ? true : false;

            clock.diagram();
        }
    };
});