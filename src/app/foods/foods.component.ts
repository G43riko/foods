import { Pipe, Component, HostListener, OnInit } from "@angular/core";
import { Config } from "../appConfig";
import { Router } from "@angular/router";
import { Http, Headers } from "@angular/http";
import { DomSanitizer} from "@angular/platform-browser";
import { FoodsService } from "./foods.service";
import { SafeResourceUrl } from "@angular/platform-browser";

@Component({
	templateUrl: "./foods.component.html",
	styleUrls: ["./foods.component.css"]
})

export class FoodsComponent implements OnInit {
	journalDishes: any[];
	astraDishes: any[];
	delfinDishes: any[];
	prestoFrame: any;
	constructor(private foodsService: FoodsService) {
		this.foodsService.getJournalFood().then((data) => this.processJournal(data));
		this.foodsService.getAstraFood().then(data => this.processAstra(data));
		this.foodsService.getDelfinFood().then(data => this.processDelfin(data));
		// this.foodsService.getPrestoFood();
		this.prestoFrame = document.getElementById("prestoRest");
	}

	isBold(key: string) {
		return	key.startsWith("Polievky") ||
				key.startsWith("Hlavné") ||
				key.startsWith("Špecialita") ||
				key.startsWith("Zeleninové ") ;
	}

	processDelfin(data: any): void {
		this.delfinDishes = data.daily_menus[0].daily_menu.dishes;
	}

	processAstra(data: any): void {
		this.astraDishes = data.daily_menus[0].daily_menu.dishes;
	}

	processJournal(data: any): void {
		this.journalDishes = data.daily_menus[0].daily_menu.dishes;
	}

	ngOnInit(): void {
	}
}
