import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
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
