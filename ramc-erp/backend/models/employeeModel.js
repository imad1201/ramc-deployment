module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define("Employee", {
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false, // ✅ prevents NULL in DB
      validate: {
        notNull: { msg: "Employee ID is required" },
        isInt: { msg: "Employee ID must be an integer" },
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // ... other fields
  });

  return Employee;
};
