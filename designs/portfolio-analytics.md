# Portfolio Analytics Screen Design

## Layout Structure

### Header with Time Filters
```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 Portfolio Analytics    [1D] [7D] [1M] [3M] [1Y] [ALL] 📅   │
└─────────────────────────────────────────────────────────────────┘
```

### Main Analytics Grid

#### Top Row - Key Metrics
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐     │
│ │ 💰 Total Value  │ │ 📈 Total Return │ │ 📊 Best Asset   │     │
│ │ $24,567.89      │ │ +$4,123.45      │ │ ETH +18.5%      │     │
│ │ +12.5% (24h)    │ │ +20.1% (7d)     │ │ $2,345.67 gain  │     │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘     │
│ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐     │
│ │ 📉 Worst Asset  │ │ ⚡ Volatility   │ │ 🎯 Sharpe Ratio │     │
│ │ MATIC -5.2%     │ │ 12.4% (7d)      │ │ 1.85            │     │
│ │ -$234.56 loss   │ │ Medium Risk     │ │ Excellent       │     │
│ └─────────────────┘ └─────────────────┘ └─────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

#### Performance Chart Section
```
┌─────────────────────────────────────────────────────────────────┐
│ 📈 Portfolio Performance                                        │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │                                                             │ │
│ │    $25K ┤                                    ╭─────────────╮ │ │
│ │         │                                    │             │ │ │
│ │    $20K ┤                              ╭─────╯             │ │ │
│ │         │                              │                   │ │ │
│ │    $15K ┤                        ╭─────╯                   │ │ │
│ │         │                        │                         │ │ │
│ │    $10K ┤                  ╭─────╯                         │ │ │
│ │         │                  │                               │ │ │
│ │     $5K ┤            ╭─────╯                               │ │ │
│ │         │            │                                     │ │ │
│ │     $0K └────────────┴─────────────────────────────────────┴ │ │
│ │         Jan  Feb  Mar  Apr  May  Jun  Jul  Aug  Sep  Oct    │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📊 Chart Controls: [Line] [Area] [Candlestick] [Compare]   │ │
│ │ 🔍 Zoom: [1D] [7D] [1M] [3M] [1Y] [ALL] [Custom Range]     │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Asset Allocation & Performance
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🥧 Asset Allocation                                         │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ 🟣 ETH    50.2%  $12,345.67  +18.5%                    │ │ │
│ │ │ 🟣 SOL   36.2%   $8,901.23   +12.3%                    │ │ │
│ │ │ 🟣 MATIC 13.5%   $3,321.00   -5.2%                     │ │ │
│ │ │                                                         │ │ │
│ │ │ [View Pie Chart] [Export Data]                          │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📊 Performance by Asset                                     │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Asset    Value     24h     7d     1M     All Time       │ │ │
│ │ │ ETH    $12,346   +2.1%   +8.5%  +18.5%  +156.7%        │ │ │
│ │ │ SOL    $8,901    +1.8%   +6.2%  +12.3%  +89.2%         │ │ │
│ │ │ MATIC  $3,321    -0.5%   -2.1%  -5.2%   +23.4%         │ │ │
│ │ │ USDC   $0        +0.0%   +0.0%  +0.0%   +0.0%          │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Risk Analysis & Metrics
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ ⚠️ Risk Analysis                                            │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ 📊 Volatility: 12.4% (Medium Risk)                     │ │ │
│ │ │ 📈 Beta: 1.2 (Higher than market)                      │ │ │
│ │ │ 🎯 Sharpe Ratio: 1.85 (Excellent)                      │ │ │
│ │ │ 📉 Max Drawdown: -8.5% (Last 30 days)                  │ │ │
│ │ │ ⏱️ Recovery Time: 12 days                               │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 📈 Advanced Metrics                                         │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ 💰 ROI: +20.1% (7d)                                     │ │ │
│ │ │ 📊 CAGR: 156.7% (Annualized)                            │ │ │
│ │ │ ⚡ Sortino Ratio: 2.1                                    │ │ │
│ │ │ 📉 VaR (95%): -3.2% (1-day)                             │ │ │
│ │ │ 🎯 Information Ratio: 1.4                                │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Transaction History & Insights
```
┌─────────────────────────────────────────────────────────────────┐
│ 📋 Recent Transactions & Insights                              │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🔄 Bridge: ETH → SOL    $500.00    +2.1% gain   2h ago     │ │
│ │ 💱 Swap: USDC → ETH     $1,200.00  +1.8% gain   4h ago     │ │
│ │ 📥 Receive: SOL         $300.00    +0.5% gain   1d ago     │ │
│ │                                                             │ │
│ │ 💡 Insights:                                             │ │
│ │ • ETH has been your best performer (+18.5% this month)    │ │
│ │ • Consider rebalancing MATIC position (-5.2% this month)  │ │
│ │ • Your portfolio outperforms 78% of similar portfolios    │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## Interactive Features

### Chart Interactions
- **Hover**: Show detailed values and tooltips
- **Click**: Zoom into specific time periods
- **Drag**: Pan through historical data
- **Double-click**: Reset to default view

### Filter Options
- **Time Periods**: 1D, 7D, 1M, 3M, 1Y, ALL, Custom
- **Asset Filters**: Show/hide specific assets
- **Transaction Types**: Bridge, Swap, Transfer, etc.
- **Performance**: Positive only, Negative only, All

### Export Options
- **Data Export**: CSV, JSON, PDF reports
- **Chart Export**: PNG, SVG, PDF
- **Share**: Social media, email, link

## Color Scheme for Charts
- **Portfolio Line**: #6366f1 (Primary purple)
- **ETH**: #f7931a (Bitcoin orange)
- **SOL**: #9945ff (Solana purple)
- **MATIC**: #8247e5 (Polygon purple)
- **USDC**: #2775ca (USDC blue)
- **Positive**: #10b981 (Green)
- **Negative**: #ef4444 (Red)
- **Neutral**: #6b7280 (Gray)

## Responsive Behavior
- **Desktop**: Full 3-column layout with side panels
- **Tablet**: 2-column layout, charts stack vertically
- **Mobile**: Single column, collapsible sections, simplified charts 