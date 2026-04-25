const mongoose = require('mongoose');
require('dotenv').config();
const Tractor = require('./models/Tractor');
const Machinery = require('./models/Machinery');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/krisha-krishi-agro';

const tractors = [
  {
    name: 'Mahindra Novo 755 DI',
    brand: 'Mahindra',
    price: 850000,
    hp: 75,
    engine: '4 Cylinder, 2730 CC',
    fuelType: 'Diesel',
    transmission: '8 Forward + 2 Reverse',
    liftCapacity: '2500 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'The Mahindra Novo 755 DI is a powerful 75 HP tractor built for heavy-duty farming. Features advanced hydraulics and superior fuel efficiency for demanding agricultural tasks.',
    features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'Adjustable Seat', 'Mobile Charging Port'],
    imageKey: 'tractor1',
    category: 'Heavy Duty'
  },
  {
    name: 'Mahindra OJA 3140',
    brand: 'Mahindra',
    price: 1025000,
    hp: 40,
    engine: '3 Cylinder, 2048 CC',
    fuelType: 'Diesel',
    transmission: '12 Forward + 3 Reverse',
    liftCapacity: '1800 kg',
    warranty: '2 Years / 2500 Hours',
    description: 'The OJA 3140 is Mahindra\'s next-gen compact tractor with advanced technology, perfect for modern farming with superior manoeuvrability and comfort.',
    features: ['Digital Dashboard', 'Cruise Control', 'Power Steering', 'Ergonomic Seat', 'LED Headlamps'],
    imageKey: 'tractor2',
    category: 'Premium'
  },
  {
    name: 'Mahindra JIVO 245 DI',
    brand: 'Mahindra',
    price: 575000,
    hp: 24,
    engine: '2 Cylinder, 1366 CC',
    fuelType: 'Diesel',
    transmission: '6 Forward + 2 Reverse',
    liftCapacity: '750 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'The JIVO 245 is a compact mini tractor ideal for small farms, orchards, and gardens. Easy to operate with excellent fuel economy.',
    features: ['Compact Size', 'Low Maintenance', 'Easy Steering', 'High Ground Clearance', 'Multi-speed PTO'],
    imageKey: 'tractor3',
    category: 'Mini'
  },
  {
    name: 'Mahindra OJA 2121',
    brand: 'Mahindra',
    price: 915000,
    hp: 21,
    engine: '2 Cylinder, 1365 CC',
    fuelType: 'Diesel',
    transmission: '6 Forward + 2 Reverse',
    liftCapacity: '850 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'The OJA 2121 is a next-generation compact tractor with 4WD capability, perfect for precision farming and tight-space operations.',
    features: ['4WD', 'Digital Cluster', 'Synchromesh Transmission', 'Power Steering', 'Flat Platform'],
    imageKey: 'tractor4',
    category: 'Compact 4WD'
  },
  {
    name: 'Mahindra Arjun Novo 605 DI-i',
    brand: 'Mahindra',
    price: 785000,
    hp: 57,
    engine: '4 Cylinder, 3532 CC',
    fuelType: 'Diesel',
    transmission: '8 Forward + 2 Reverse',
    liftCapacity: '2200 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'The Arjun Novo 605 is a versatile workhorse tractor with a powerful engine, suitable for all types of farming operations including ploughing, tilling, and hauling.',
    features: ['Power Steering', 'Oil Immersed Brakes', 'Dual Clutch', 'High Backup Torque', 'Adjustable Seat'],
    imageKey: 'tractor5',
    category: 'All-Rounder'
  },
  {
    name: 'John Deere 5310',
    brand: 'John Deere',
    price: 880000,
    hp: 55,
    engine: '3 Cylinder, 2900 CC',
    fuelType: 'Diesel',
    transmission: '9 Forward + 3 Reverse',
    liftCapacity: '2000 kg',
    warranty: '5 Years',
    description: 'The John Deere 5310 is a premium and powerful tractor known for its unmatched performance, heavy-duty applications, and advanced technology.',
    features: ['Power Steering', 'Multi-plate Wet Disc Brakes', 'Collar Shift Transmission', 'High Torque Backup', 'Adjustable Front Axle'],
    imageKey: 'john_deere_5310',
    category: 'Heavy Duty'
  },
  {
    name: 'Mahindra 575 DI',
    brand: 'Mahindra',
    price: 680000,
    hp: 45,
    engine: '4 Cylinder, 2730 CC',
    fuelType: 'Diesel',
    transmission: '8 Forward + 2 Reverse',
    liftCapacity: '1600 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'The Mahindra 575 DI is a robust and reliable tractor that provides high performance in both agricultural and haulage tasks.',
    features: ['Mechanical/Power Steering', 'Oil Immersed Brakes', 'Partial Constant Mesh', 'High Ground Clearance', 'Ergonomic Design'],
    imageKey: 'mahindra_575_di',
    category: 'Utility'
  },
  {
    name: 'Swaraj 744 FE',
    brand: 'Swaraj',
    price: 690000,
    hp: 48,
    engine: '3 Cylinder, 3136 CC',
    fuelType: 'Diesel',
    transmission: '8 Forward + 2 Reverse',
    liftCapacity: '1700 kg',
    warranty: '2 Years / 2000 Hours',
    description: 'Swaraj 744 FE is a fuel-efficient and multi-purpose tractor perfect for cultivating, harvesting, and haulage applications.',
    features: ['Power Steering', 'Multi-speed PTO', 'Oil Immersed Brakes', 'Heavy Front Axle', 'Water Cooled Engine'],
    imageKey: 'swaraj_744_fe',
    category: 'Utility'
  }
];

const machinery = [
  {
    name: 'Heavy Duty Rotavator',
    type: 'Rotavator',
    price: 85000,
    description: 'High-performance rotavator for efficient soil preparation. Designed for deep tilling with durable blades that ensure thorough soil mixing.',
    features: ['48 Blades', 'Multi-Speed Gearbox', 'Heavy Duty Frame', 'Adjustable Depth', 'Low Maintenance'],
    imageKey: 'rotavator',
    compatibility: '35 HP and above',
    weight: '380 kg'
  },
  {
    name: 'Spring Loaded Cultivator',
    type: 'Cultivator',
    price: 45000,
    description: 'Spring-loaded cultivator for secondary tillage. Perfect for weed control and seedbed preparation with adjustable tine spacing.',
    features: ['9 Tines', 'Spring Loaded', 'Adjustable Width', 'Hardened Steel Tips', 'Easy Mounting'],
    imageKey: 'cultivator',
    compatibility: '30 HP and above',
    weight: '210 kg'
  },
  {
    name: 'Hydraulic Reversible Plough',
    type: 'Plough',
    price: 35000,
    description: 'Hydraulic reversible plough for primary tillage. Delivers clean furrows and efficient soil turning for better crop yields.',
    features: ['3 Bottom', 'Hydraulic Reversible', 'Hardened Steel Blades', 'Adjustable Depth', 'Corrosion Resistant'],
    imageKey: 'plough',
    compatibility: '40 HP and above',
    weight: '290 kg'
  },
  {
    name: 'Automatic Seed Drill',
    type: 'Seed Drill',
    price: 65000,
    description: 'Precision seed drill for accurate seed placement. Ensures uniform seed spacing and depth for optimal germination rates.',
    features: ['9 Row', 'Adjustable Row Spacing', 'Fertilizer Attachment', 'Seed Rate Control', 'Calibration Cups'],
    imageKey: 'seed-drill',
    compatibility: '35 HP and above',
    weight: '320 kg'
  },
  {
    name: 'Hydraulic Tipping Trailer',
    type: 'Trailer',
    price: 120000,
    description: 'Heavy-duty hydraulic tipping trailer for transporting crops, fertilizers, and farm materials. Large capacity with easy unloading mechanism.',
    features: ['5 Ton Capacity', 'Hydraulic Tipping', 'Reinforced Floor', 'Air Brakes', 'Removable Sides'],
    imageKey: 'trailer',
    compatibility: '45 HP and above',
    weight: '850 kg'
  },
  {
    name: 'Laser Land Leveler',
    type: 'Leveler',
    price: 320000,
    description: 'Precision laser land leveler for perfectly flat fields. Saves water, increases yield, and ensures uniform crop maturity.',
    features: ['Laser Guided Precision', 'Hydraulic Control', 'Durable Bucket', 'Adjustable Mast', 'Water Saving'],
    imageKey: 'laser_leveler',
    compatibility: '50 HP and above',
    weight: '600 kg'
  },
  {
    name: 'Tractor Mounted Boom Sprayer',
    type: 'Sprayer',
    price: 55000,
    description: 'Efficient boom sprayer for applying pesticides, herbicides, and fertilizers uniformly across large fields.',
    features: ['400L Tank Capacity', '12m Boom Length', 'High Pressure Pump', 'Anti-Drip Nozzles', 'Corrosion Resistant Tank'],
    imageKey: 'boom_sprayer',
    compatibility: '35 HP and above',
    weight: '150 kg'
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Tractor.deleteMany({});
    await Machinery.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Tractor.insertMany(tractors);
    await Machinery.insertMany(machinery);
    console.log('🌱 Seed data inserted successfully!');
    console.log(`   → ${tractors.length} tractors added`);
    console.log(`   → ${machinery.length} machinery items added`);

    await mongoose.connection.close();
    console.log('✅ Database connection closed');
  } catch (err) {
    console.error('❌ Seeding error:', err.message);
    process.exit(1);
  }
}

seedDatabase();
