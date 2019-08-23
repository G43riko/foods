import {Directive, Inject, Injector, Input, NgModuleFactory, NgModuleFactoryLoader, NgModuleRef, OnDestroy, Type, ViewContainerRef} from "@angular/core";
import {LAZY_MODULES_MAP, LazyModules} from "./lazy.factory";

type ModuleWithRoot = Type<any> & { rootComponent: Type<any> };

@Directive({
    selector: "[loadModule]",
})
export class LoadModuleDirective implements OnDestroy {
    @Input("loadModule") public moduleName: keyof LazyModules;
    private moduleRef: NgModuleRef<any>;

    public constructor(private vcr: ViewContainerRef,
                       private injector: Injector,
                       private loader: NgModuleFactoryLoader,
                       @Inject(LAZY_MODULES_MAP) private modulesMap,
    ) {
    }

    public ngOnInit(): void {
        this.loader
            .load(this.modulesMap[this.moduleName])
            .then((moduleFactory: NgModuleFactory<any>) => {
                this.moduleRef = moduleFactory.create(this.injector);
                const rootComponent = (moduleFactory.moduleType as ModuleWithRoot).rootComponent;

                console.log("rootComponent: ", rootComponent);
                const factory = this.moduleRef.componentFactoryResolver.resolveComponentFactory(
                    rootComponent,
                );
                console.log("factory: ", factory);
                const result = this.vcr.createComponent(factory);
                console.log("result: ", result);
            });

    }

    public ngOnDestroy(): void {
        this.moduleRef && this.moduleRef.destroy();
    }
}
