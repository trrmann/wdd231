$siteURLS = @{}
#cd "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\images\archive"
#cd "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\images"
Set-Location "C:\Users\p40007y\OneDrive - BYU-Idaho\Downloads\libwebp-1.6.0-windows-x64\bin"
Set-Location "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\scripts"

#Get-ChildItem "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\images\archive" | Where-Object { ($_.Extension -eq '.jpg') -or ($_.Extension -eq '.JPG') -or ($_.Extension -eq '.jpeg') -or ($_.Extension -eq '.png') -or ($_.Extension -eq '.webp') } | ForEach-Object { 
#    $inputFile = $_.FullName
#    $outputFile = "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\images\" + ($_.BaseName + ".webp")
#    #& .\cwebp.exe -q 80 $inputFile -o $outputFile
#    Write-Host "Converted $inputFile to $outputFile"
#    & .\cwebp.exe -metadata all $inputFile *>> "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\images\output.txt" #-a
#}

#$url = "https://example.com"
#$response = Invoke-WebRequest -Uri $url
#$response.Links.Href

#$jsonData = Get-Content -Path "../data/data.json" -Raw -Encoding UTF8
$jsonObjectData = Get-Content -Path "../data/data.json" -Raw -Encoding UTF8 | ConvertFrom-Json
$siteEntries = $jsonObjectData.data | Where-Object {
    $_.type -eq "site"
}

Set-Location -Path "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\data"
(Get-Content -Path "data.json" -Raw -Encoding UTF8 | ConvertFrom-Json).data | Where-Object {
    $_.type -eq "site"
} | ForEach-Object {
    Write-Host $_.source_url
    if ($_.pull_source) {
        Start-Process $_.source_url
        #$response = Invoke-WebRequest -Uri $_.source_url
        #$links = $response.Links | Where-Object { $_.Href -match "\.(jpg|jpeg|png|webp)$" } | Select-Object -First 1 #Href #|  Where-Object { $_.innerHTML -contains ".*srcset.*" }
        #$destFile = "../images/" + ([System.IO.Path]::GetFileName($links.Href))
        #Start-BitsTransfer -Source $links.Href -Destination $destFile
        #$response = Invoke-WebRequest -Uri "https://api.example.com/getImages?
        #$images = ($response).Images | Where-Object { $_.Width -ge 1024 } | Select-Object src
        #$siteURLS[$_.name] = $links
    }
    $originalImage = "../" + $_.images.original.name
    Write-Host "Original image: "$originalImage
    $originalWidth = $_.images.original.dimension[0]
    $originalHeight = $_.images.original.dimension[1]
    if ($_.build_webp -eq $true) {
        $baseName = $_.nameId
        $rebuild = $_.rebuild_webp
        $_.images.webp.sizes.forEach( {
                $targetHeight = [math]::Round(($_ / $originalWidth) * $originalHeight)
                $destinationFile = "../images/" + ($baseName + "." + $_ + ".webp")
                #Write-Host "dest file: "$destinationFile
                #Write-Host "height: "$targetHeight
                $exits = Test-Path $destinationFile
                if (($rebuild -eq $false) -and ($exits -eq $true)) {
                    #Write-Host "File $destinationFile already exists. Skipping conversion."
                }
                else {
                    Set-Location "C:\Users\p40007y\OneDrive - BYU-Idaho\Documents\Projects\wdd231\project\scripts"
                    $inputFile = "../images/" + $originalImage
                    #Set-Location "C:\Users\p40007y\OneDrive - BYU-Idaho\Downloads\libwebp-1.6.0-windows-x64\bin"
                    & 'C:\Users\p40007y\OneDrive - BYU-Idaho\Downloads\libwebp-1.6.0-windows-x64\bin\cwebp.exe' -size 49000 -qrange 5 100 -resize $_ $targetHeight $inputFile -o $destinationFile
                    #Write-Host "Converted $inputFile to $destinationFile"
                }
            } )
    }
}
$siteURLS | ConvertTo-Json | Write-Host