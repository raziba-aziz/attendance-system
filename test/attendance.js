const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Attendance Contract", function () {
  let Attendance, attendance, owner, addr1;

  beforeEach(async function () {
    Attendance = await ethers.getContractFactory("Attendance");
    [owner, addr1] = await ethers.getSigners();
    attendance = await Attendance.deploy();
    // await attendance.deployed();
  });

  it("Should mark attendance for a user", async function () {
    await attendance.connect(addr1).markAttendance();
    expect(await attendance.checkAttendance(addr1.address)).to.equal(true);
  });

  it("Should return false for users who didn't mark attendance", async function () {
    expect(await attendance.checkAttendance(owner.address)).to.equal(false);
  });
});
