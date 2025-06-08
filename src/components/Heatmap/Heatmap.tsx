import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PieChart } from '@mui/x-charts/PieChart';

// Your incoming attackTypes array (assumed available)
const inferAttackType = (attackName: string): string => {
  const name = attackName.toLowerCase();
  if (name.includes("poisoning")) return "Data Poisoning";
  if (name.includes("evasion") || name.includes("misclassification")) return "Evasion Attack";
  if (name.includes("reconstruction")) return "Data Reconstruction";
  if (name.includes("integrity")) return "Integrity Attack";
  if (name.includes("privacy")) return "Privacy Attack";
  if (name.includes("targeted")) return "Targeted Attack";
  if (name.includes("black box")) return "Black Box Attack";
  if (name.includes("white box")) return "White Box Attack";
  return "Other";
};

export default function PieAnimation({ attackTypes }: { attackTypes: any[] }) {
  const [radius, setRadius] = React.useState(50);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);

  // Map attack types
  const inferredAttackTypes = attackTypes.map(attack => ({
    attackType: inferAttackType(attack.attack_name),
  }));

  // Count occurrences
  const heatmapData = inferredAttackTypes.reduce<Record<string, number>>((acc, curr) => {
    acc[curr.attackType] = (acc[curr.attackType] || 0) + 1;
    return acc;
  }, {});

  // Convert to PieChart format
  const chartData = Object.entries(heatmapData).map(([label, value], index) => ({
    id: index,
    value,
    label,
  }));

  // Slice based on number of items to display
  const slicedData = chartData.slice(0, itemNb);

  return (
    <Box sx={{ width: '100%' }}>
      <PieChart
        height={300}
        width={300}
        series={[
          {
            data: slicedData,
            innerRadius: radius,
           
            arcLabelMinAngle: 20,
          },
        ]}
        skipAnimation={skipAnimation}
      />
      <FormControlLabel
        checked={skipAnimation}
        control={
          <Checkbox onChange={(event) => setSkipAnimation(event.target.checked)} />
        }
        label="skipAnimation"
        labelPlacement="end"
      />
      <Typography id="input-item-number" gutterBottom>
        Number of attack types
      </Typography>
      <Slider
        value={itemNb}
        onChange={(event, val) => typeof val === 'number' && setItemNb(val)}
        valueLabelDisplay="auto"
        min={1}
        max={chartData.length}
        aria-labelledby="input-item-number"
      />
      <Typography id="input-radius" gutterBottom>
        Radius
      </Typography>
      <Slider
        value={radius}
        onChange={(event, val) => typeof val === 'number' && setRadius(val)}
        valueLabelDisplay="auto"
        min={15}
        max={100}
        aria-labelledby="input-radius"
      />
    </Box>
  );
}
