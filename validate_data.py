#!/usr/bin/env python3
"""
Data Validation Script for KI-Projekt
Checks data for coherence, logic, and usefulness
"""

import json
import os
import sys
from pathlib import Path
from typing import Dict, List, Tuple


class DataValidator:
    """Validates data files for coherence, logic, and usefulness"""
    
    def __init__(self, data_dir: str = "data"):
        self.data_dir = Path(data_dir)
        self.errors: List[str] = []
        self.warnings: List[str] = []
        self.valid_files: List[str] = []
        
    def validate_json_file(self, filepath: Path) -> bool:
        """Validate a single JSON file"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            # Check if data has required structure
            if not isinstance(data, (dict, list)):
                self.errors.append(f"{filepath}: Invalid JSON structure (must be object or array)")
                return False
            
            # Check for coherence - data should have meaningful content
            if isinstance(data, dict):
                if not data:
                    self.warnings.append(f"{filepath}: Empty data object")
                    return True
                
                # Check for required metadata fields
                if 'metadata' in data:
                    self._validate_metadata(filepath, data['metadata'])
                
                # Check for content
                if 'content' in data or 'instruction' in data or 'prompt' in data:
                    self._validate_content(filepath, data)
            
            elif isinstance(data, list):
                if not data:
                    self.warnings.append(f"{filepath}: Empty data array")
                    return True
                
                # Validate each item in the list
                for idx, item in enumerate(data):
                    if isinstance(item, dict):
                        self._validate_content(filepath, item, f"[{idx}]")
            
            self.valid_files.append(str(filepath))
            return True
            
        except json.JSONDecodeError as e:
            self.errors.append(f"{filepath}: Invalid JSON - {str(e)}")
            return False
        except Exception as e:
            self.errors.append(f"{filepath}: Error reading file - {str(e)}")
            return False
    
    def _validate_metadata(self, filepath: Path, metadata: dict) -> None:
        """Validate metadata section"""
        required_fields = ['description', 'purpose']
        for field in required_fields:
            if field not in metadata:
                self.warnings.append(f"{filepath}: Missing recommended metadata field '{field}'")
    
    def _validate_content(self, filepath: Path, data: dict, prefix: str = "") -> None:
        """Validate content for usefulness and logic"""
        content_fields = ['content', 'instruction', 'prompt', 'text', 'description']
        has_content = False
        
        for field in content_fields:
            if field in data:
                has_content = True
                content = data[field]
                
                # Check for empty or too short content
                if isinstance(content, str):
                    if len(content.strip()) == 0:
                        self.warnings.append(f"{filepath}{prefix}: Empty '{field}' field")
                    elif len(content.strip()) < 10:
                        self.warnings.append(f"{filepath}{prefix}: '{field}' field is very short (<10 chars)")
        
        if not has_content and prefix:
            self.warnings.append(f"{filepath}{prefix}: No meaningful content fields found")
    
    def validate_markdown_file(self, filepath: Path) -> bool:
        """Validate markdown documentation files"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check for minimum content
            if len(content.strip()) < 50:
                self.warnings.append(f"{filepath}: Markdown file is very short")
            
            # Check for basic markdown structure
            if not any(line.startswith('#') for line in content.split('\n')):
                self.warnings.append(f"{filepath}: No markdown headers found")
            
            self.valid_files.append(str(filepath))
            return True
            
        except Exception as e:
            self.errors.append(f"{filepath}: Error reading file - {str(e)}")
            return False
    
    def validate_all(self) -> Tuple[int, int, int]:
        """Validate all data files in the data directory"""
        if not self.data_dir.exists():
            self.errors.append(f"Data directory '{self.data_dir}' does not exist")
            return 0, 0, 1
        
        json_files = list(self.data_dir.rglob("*.json"))
        md_files = list(self.data_dir.rglob("*.md"))
        
        # Validate JSON files
        for json_file in json_files:
            self.validate_json_file(json_file)
        
        # Validate markdown files
        for md_file in md_files:
            self.validate_markdown_file(md_file)
        
        return len(self.valid_files), len(self.warnings), len(self.errors)
    
    def print_report(self) -> None:
        """Print validation report"""
        print("\n" + "="*60)
        print("DATA VALIDATION REPORT")
        print("="*60)
        
        valid_count, warning_count, error_count = len(self.valid_files), len(self.warnings), len(self.errors)
        
        print(f"\n✓ Valid files: {valid_count}")
        print(f"⚠ Warnings: {warning_count}")
        print(f"✗ Errors: {error_count}")
        
        if self.errors:
            print("\n" + "-"*60)
            print("ERRORS:")
            print("-"*60)
            for error in self.errors:
                print(f"  ✗ {error}")
        
        if self.warnings:
            print("\n" + "-"*60)
            print("WARNINGS:")
            print("-"*60)
            for warning in self.warnings:
                print(f"  ⚠ {warning}")
        
        if self.valid_files and not self.errors:
            print("\n" + "-"*60)
            print("VALID FILES:")
            print("-"*60)
            for valid_file in self.valid_files:
                print(f"  ✓ {valid_file}")
        
        print("\n" + "="*60)
        
        if error_count > 0:
            print("❌ Validation FAILED - Please fix errors above")
            return False
        elif warning_count > 0:
            print("⚠️  Validation PASSED with warnings")
            return True
        else:
            print("✅ Validation PASSED - All files are valid!")
            return True


def main():
    """Main entry point"""
    print("KI-Projekt Data Validator")
    print("Checking for coherence, logic, and usefulness...\n")
    
    validator = DataValidator()
    validator.validate_all()
    success = validator.print_report()
    
    sys.exit(0 if success else 1)


if __name__ == "__main__":
    main()
