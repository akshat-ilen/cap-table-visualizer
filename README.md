# Cap Table Visualizer

Cap Table Visualizer is a web application that allows users to upload and analyze cap table data from OCX (Open Cap Table) files. It provides a comprehensive visual representation of the cap table, including share distributions, stakeholder information, and valuation history.

## Features

- Upload and parse OCX files
- Display key cap table metrics (total stakeholders, authorized shares, outstanding shares, available for grant)
- Visualize authorized shares distribution
- Show stakeholder type distribution
- Present valuation time series data
- Detailed cap table summary with share class breakdown
- Interactive stakeholder table with detailed share information

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Recharts for data visualization
- Tanstack Table for advanced table functionality

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/cap-table-visualizer.git
   ```

2. Navigate to the project directory:

   ```
   cd cap-table-visualizer
   ```

3. Install dependencies:

   ```
   npm install
   ```

   or

   ```
   yarn install
   ```

4. Run the development server:

   ```
   npm run dev
   ```

   or

   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Usage

1. On the homepage, click the "Upload OCX File" button to select and upload your OCX file.
2. Once uploaded, the application will process the file and display the cap table visualization.
3. Explore different sections of the visualization:
   - Summary metrics at the top
   - Pie charts showing authorized shares and stakeholder type distributions
   - Valuation time series chart
   - Detailed cap table summary
   - Interactive stakeholder table with hover functionality for detailed share information

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OCX-parser library for parsing OCX files
- Recharts for providing powerful charting components
- shadcn/ui for beautiful and accessible UI components
