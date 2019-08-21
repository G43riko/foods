"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var GeoLocationService = /** @class */ (function () {
    function GeoLocationService() {
        var _this = this;
        this.coordinates = new rxjs_1.BehaviorSubject(null);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.coordinates.next({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            }, function (error) { return _this.coordinates.error(error); });
            // this.id = navigator.geolocation.watchPosition((position: Position) => {
            //     this.coordinates.next({
            //         lat: position.coords.latitude,
            //         long: position.coords.longitude,
            //     });
            // }, (error: PositionError) => this.coordinates.error(error));
        }
        else {
            this.coordinates.error("Geolocation is not supported by this browser.");
        }
    }
    GeoLocationService.prototype.cleanUp = function () {
        if (this.id) {
            navigator.geolocation.clearWatch(this.id);
        }
    };
    GeoLocationService.prototype.distanceAsync = function (coordinates) {
        var _this = this;
        if (!coordinates) {
            return rxjs_1.of(0);
        }
        return this.coordinates.pipe(operators_1.map(function (myCoordinates) {
            if (!myCoordinates) {
                return 0;
            }
            return _this.calcCrow(myCoordinates.lat, myCoordinates.long, coordinates.lat, coordinates.long);
        }));
    };
    GeoLocationService.prototype.distanceFrom = function (coordinates) {
        return this.distance(coordinates, this.coordinates.value);
    };
    GeoLocationService.prototype.distance = function (coordinates, myCoordinates) {
        if (!coordinates || !myCoordinates) {
            return 0;
        }
        return this.calcCrow(myCoordinates.lat, myCoordinates.long, coordinates.lat, coordinates.long);
    };
    GeoLocationService.prototype.calcCrow = function (lat1, lon1, lat2, lon2) {
        var toRad = function (value) {
            return value * Math.PI / 180;
        };
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    };
    GeoLocationService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], GeoLocationService);
    return GeoLocationService;
}());
exports.GeoLocationService = GeoLocationService;
