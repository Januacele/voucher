import { jest } from "@jest/globals";
import voucherService, { VoucherCreateData } from "../../src/services/voucherService";
import voucherRepository from "../../src/repositories/voucherRepository";

jest.mock("../../src/repositories/voucherRepository");

describe("Voucher teste", () => {
    it("shoul create a voucher", async () => {
       jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce(():any => { });
       jest.spyOn(voucherRepository, "createVoucher").mockImplementationOnce((): any => { });
       
       await voucherService.createVoucher("a1a2b3k", 20);

       expect(voucherRepository.getVoucherByCode).toBeCalled();
    });

    it("should no duplicate voucher", async () => {
        const voucher : VoucherCreateData = {
            code: "3030aass",
            discount: 20,
            used: false
        };
        jest.spyOn(voucherRepository, "getVoucherByCode").mockImplementationOnce((): any => {
            return {
                code: voucher.code,
                discount: voucher.discount
            }
        });
        const result = voucherService.createVoucher(voucher.code, voucher.discount);

        expect(result).rejects.toEqual({message: "Voucher already exist.", type: "conflict"});
    });
    
})