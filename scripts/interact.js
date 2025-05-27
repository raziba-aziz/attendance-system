async function main() {
  const [deployer] = await ethers.getSigners();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Replace with your deployed contract address

  // Get contract instance at the deployed address
  const attendance = await ethers.getContractAt("Attendance", contractAddress);

  // Mark attendance for deployer
  const tx = await attendance.markAttendance();
  await tx.wait();
  console.log("Attendance marked for:", deployer.address);

  // Check attendance status
  const attended = await attendance.checkAttendance(deployer.address);
  console.log("Attendance status:", attended);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
