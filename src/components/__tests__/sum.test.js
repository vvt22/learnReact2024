import { sum } from "../sum";

test("first test case",()=>{

    const res=sum(5,5);
    //Assertion
    expect(res).toBe(10);
})