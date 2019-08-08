import { FirebaseModule } from "./firebase.module";

describe("FirebaseModule", () => {
    let firebaseModuleModule: FirebaseModule;

    beforeEach(() => {
        firebaseModuleModule = new FirebaseModule();
    });

    it("should create an instance", () => {
        expect(firebaseModuleModule).toBeTruthy();
    });
});
