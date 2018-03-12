export class Config {
	public static TITLE						= "DemoPage";
	public static BASE_URL					= "http://localhost:3000";
	public static API_ENDPOINT_ADD_IMAGE	= "http://localhost:8080/images/add";
	public static API_ENDPOINT_IMAGES	 	= "http://localhost:8080/images";

	public static PATH_HOME			= "home";
	public static PATH_IMAGES		= "images";
	public static PATH_IMAGE_UPLOAD = "upload";
	public static PATH_YOUTUBE 		= "youtube";
	public static PATH_TODO 		= "todo";
	public static PATH_BROWSER 		= "browser";
	public static PATH_CITIES 		= "cities";
	public static PATH_FOODS 		= "food";
	public static PATH_MAP 			= "map";
	public static PATH_IMAGE_DETAIL = "detail";

	public static YOUTUBE_API_URL 	= "https://www.googleapis.com/youtube/v3/search" ;
	public static YOUTUBE_API_KEY 	= "AIzaSyAh6T37m_p-3DQ6JELbqIIhnvqXBgOXf-E";

	public static ZOMATO_API_KEY 	= "cbc11fdb6cb6e160bc12508dcb57b405";
	public static JOURNAL_ID 		= "16508016";
	public static ASTRA_ID 			= "16508164";
	public static DELFIN_ID 		= "16508094";

	public static ZOMATO_API_URL 	= "https://developers.zomato.com/api/v2.1/dailymenu";
	public static PRESTO_URL 		= "http://www.restaurantpresto.sk/sk/menu/presto-bbc-i";

	public static MENU_ITEMS: any[] = [
		{link: "/", 						label: "home"},
		{link: "/" + Config.PATH_IMAGES,	label: "images"},
		{link: "/" + Config.PATH_YOUTUBE, 	label: "youtube"},
		{link: "/" + Config.PATH_BROWSER, 	label: "browser"},
		{link: "/" + Config.PATH_CITIES, 	label: "cities"},
		{link: "/" + Config.PATH_MAP, 		label: "map"},
		{link: "/" + Config.PATH_FOODS, 	label: "foods"},
		{link: "/" + Config.PATH_TODO, 		label: "todo"}
	];

	public static BROWSER_PAGES: any[] = [
		{label: "Bing",					link: "https://www.bing.com/"},
		{label: "Angular",				link: "https://angular.io/"},
		{label: "Google maps",			link: "https://www.google.com/maps/embed"},
		{label: "Restaurant Presto",	link: "http://www.restaurantpresto.sk/sk/menu/presto-bbc-i/7.7.2017/"},
		{label: "Bigger",				link: "http://bigger.sk/menu/"}
	];
}
