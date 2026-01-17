using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace felsenauto.Migrations
{
    /// <inheritdoc />
    public partial class AddCarModelToAppointment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CarModel",
                table: "Appointments",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarModel",
                table: "Appointments");
        }
    }
}
