# Personalisierte-HookedToFate-KI-Projekt
A persistent memory via POST cloudservice and Sync from chat 

## Overview
This repository serves as a structured data storage for personalized AI instruction-craft projects. It provides organized storage with built-in validation for coherence, logic, and usefulness.

## Features
- ✅ **Organized Storage**: Structured directory system for different data types
- ✅ **Data Validation**: Automated checking for coherence and logic
- ✅ **Organization Tools**: Scripts to automatically categorize and organize data
- ✅ **Templates**: Reusable templates for consistent data structure
- ✅ **Examples**: Demonstration files showing proper usage

## Directory Structure
```
data/
├── instructions/    # AI instructions and system prompts
├── prompts/        # User prompts and input templates
├── examples/       # Example data and use cases
└── templates/      # Reusable templates
```

## Usage

### Validating Data
Check your data for coherence, logic, and usefulness:
```bash
python validate_data.py
```

### Organizing Data
Automatically organize files into appropriate categories:
```bash
# Dry run (preview changes)
python organize_data.py --dry-run

# Actually organize files
python organize_data.py
```

### Adding New Data
1. Create your data file following the template format
2. Place it in the appropriate category directory
3. Run validation to ensure quality
4. Commit and sync changes

## Data Quality Standards
All data should meet these criteria:
- **Coherence**: Logically consistent and well-structured
- **Logic**: Follows reasonable patterns and principles
- **Usefulness**: Serves a clear purpose for AI instruction crafting

## Example Data Format
See the `data/templates/` directory for template files you can use as starting points.

## Contributing
When adding new data:
1. Use descriptive filenames
2. Include proper metadata
3. Validate before committing
4. Document purpose and usage
