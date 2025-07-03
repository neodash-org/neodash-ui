# Dashboard Overview - Main Screen Design

## Layout Structure

### Header Section (Top)
```
┌─────────────────────────────────────────────────────────────────┐
│ 🏠 Neodash Dashboard                    [EVM Wallet] [Solana] ⚙️ │
└─────────────────────────────────────────────────────────────────┘
```

### Quick Stats Bar (Below Header)
```
┌─────────────────────────────────────────────────────────────────┐
│ 💰 Total Portfolio: $24,567.89  📈 +12.5% (24h)  🔗 3 Chains   │
└─────────────────────────────────────────────────────────────────┘
```

### Main Content Grid (3 Columns)

#### Left Column - Portfolio Summary
```
┌─────────────────────────────────────┐
│ 📊 Portfolio Overview               │
│ ┌─────────────────────────────────┐ │
│ │ Total Value: $24,567.89         │ │
│ │ 24h Change: +$2,734.21 (+12.5%) │ │
│ │ 7d Change: +$4,123.45 (+20.1%)  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🎯 Quick Actions                    │
│ ┌─────────────────────────────────┐ │
│ │ [Bridge Assets] [Swap Tokens]   │ │
│ │ [Stake Tokens] [View NFTs]      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📈 Performance Chart               │
│ ┌─────────────────────────────────┐ │
│ │ [7D Chart - Line Graph]         │ │
│ │ Portfolio value over time       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Center Column - Chain Breakdown
```
┌─────────────────────────────────────┐
│ 🔗 Multi-Chain Overview             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Ethereum                        │ │
│ │ $12,345.67 (50.2%)             │ │
│ │ [ETH: 4.2] [USDC: 2,500]       │ │
│ │ [Expand ▼]                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Solana                          │ │
│ │ $8,901.23 (36.2%)              │ │
│ │ [SOL: 45.2] [USDC: 1,200]      │ │
│ │ [Expand ▼]                      │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Polygon                         │ │
│ │ $3,321.00 (13.5%)              │ │
│ │ [MATIC: 2,100] [USDC: 800]     │ │
│ │ [Expand ▼]                      │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

#### Right Column - Recent Activity & Alerts
```
┌─────────────────────────────────────┐
│ ⚡ Recent Activity                  │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🔄 Bridge: ETH → SOL            │ │
│ │ $500.00 • 2 hours ago           │ │
│ │ [View Transaction]              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 💱 Swap: USDC → ETH             │ │
│ │ $1,200.00 • 4 hours ago         │ │
│ │ [View Transaction]              │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 🚨 Alerts                          │
│ ┌─────────────────────────────────┐ │
│ │ ⚠️ ETH price dropped 5%         │ │
│ │ [Set Alert] [Dismiss]           │ │
│ └─────────────────────────────────┘ │
│                                     │
│ 📱 Quick Stats                     │
│ ┌─────────────────────────────────┐ │
│ │ Total Transactions: 47          │ │
│ │ Gas Spent: $234.56              │ │
│ │ Bridges: 12                     │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

## Color Scheme
- **Background**: #0f0f23 (Dark Navy)
- **Cards**: #1a1a2e (Slightly lighter navy)
- **Borders**: #2d2d44 (Subtle borders)
- **Text Primary**: #ffffff (White)
- **Text Secondary**: #a0a0a0 (Light gray)
- **Accent Purple**: #6366f1 (Primary action)
- **Accent Blue**: #3b82f6 (Secondary action)
- **Success Green**: #10b981 (Positive changes)
- **Warning Orange**: #f59e0b (Alerts)

## Interactive Elements
- **Hover Effects**: Subtle glow on cards and buttons
- **Transitions**: Smooth 0.2s transitions
- **Loading States**: Skeleton loaders for data
- **Responsive**: Mobile-first design with breakpoints

## Typography
- **Headers**: Inter, 600 weight
- **Body**: Inter, 400 weight
- **Numbers**: JetBrains Mono for precise display
- **Sizes**: 14px base, 16px for body, 20px+ for headers 