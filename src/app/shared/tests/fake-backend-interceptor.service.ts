import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {delay, dematerialize, materialize, mergeMap} from "rxjs/operators";

const response = {
    daily_menus: [
        {
            daily_menu: {
                daily_menu_id: "20526337",
                start_date: "2019-08-09 00:00:00",
                end_date: "2019-08-09 23:59:59",
                name: "",
                dishes: [{dish: {dish_id: "695371811", name: "Polievky:", price: ""}}, {
                    dish: {
                        dish_id: "695371812",
                        name: "Paradajková s parmezánom",
                        price: "",
                    },
                }, {dish: {dish_id: "695371813", name: "Krém z pečenej papriky s balsamicom", price: ""}}, {
                    dish: {
                        dish_id: "695371814",
                        name: "Zeleninová so špenátovými haluškami",
                        price: "",
                    },
                }, {dish: {dish_id: "695371815", name: "Hlavné jedlo / Main Dishes:", price: ""}}, {
                    dish: {
                        dish_id: "695371816",
                        name: "1) Kurací steak s medovo-horčicovou marinádou, hráškové pyré, glazovaná karotka",
                        price: "",
                    },
                }, {dish: {dish_id: "695371817", name: "2) Cuketové risotto so špenátom a sušenými paradajkami", price: ""}}, {
                    dish: {
                        dish_id: "695371818",
                        name: "3) Zapekaná sezónna zelenina s mozzarellou",
                        price: "",
                    },
                }],
            },
        }, {
            daily_menu: {
                daily_menu_id: "19951971",
                start_date: "2019-01-01 00:00:00",
                end_date: "2019-12-31 23:59:59",
                name: "Stála ponuka počas pracovných dní",
                dishes: [{dish: {dish_id: "690499746", name: "Šaláty/ Salads", price: ""}}, {
                    dish: {
                        dish_id: "690499747",
                        name: "90g s marinovaným lososom na spôsob Gravlax",
                        price: "",
                    },
                }, {dish: {dish_id: "690499748", name: "120g s grilovanými kuracími prsiami a zeleninou", price: ""}}, {
                    dish: {
                        dish_id: "690499749",
                        name: "300g s pečenou tekvicou, pohánkou a feta syrom",
                        price: "",
                    },
                }, {dish: {dish_id: "690499750", name: "80g/1ks s kozím syrom, marinovanou cuketou a brusnicami", price: ""}}, {
                    dish: {
                        dish_id: "690499751",
                        name: "300g s cviklovým bulgurom, harikotami, údeným tofu a restovaným cícerom",
                        price: "",
                    },
                }],
            },
        },
    ],
    status: "success",
};

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    private static readonly REQUEST_DELAY = 500;

    public constructor() {
        // empty
    }

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return of(null).pipe(mergeMap(() => {
            console.log("request: ", request);

            if (request.url.startsWith("https://developers.zomato.com/api/v2.1/dailymenu")) {
                return of(new HttpResponse({
                    status: 200, body: response,
                }));
            }

            return next.handle(request);

        })).pipe(materialize()).pipe(delay(FakeBackendInterceptor.REQUEST_DELAY)).pipe(dematerialize());
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true,
};
