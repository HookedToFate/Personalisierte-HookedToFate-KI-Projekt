# Data Organization Structure

This directory contains organized data for the personalized KI instruction-craft project.

## Directory Structure

- **instructions/** - AI instructions and system prompts
- **prompts/** - User prompts and input templates
- **examples/** - Example data and use cases
- **templates/** - Reusable templates for different scenarios

## Data Format Guidelines

All data files should follow these principles:

1. **Coherence**: Data should be logically consistent and follow a clear structure
2. **Logic**: Instructions should be logical and follow reasonable patterns
3. **Usefulness**: Data should serve a clear purpose for AI instruction crafting

## File Naming Convention

Use descriptive names with the following pattern:
- `[category]_[description]_[version].json` for JSON files
- `[category]_[description].md` for markdown documentation

## Validation

Use the validation script to check your data:
```bash
python validate_data.py
```
